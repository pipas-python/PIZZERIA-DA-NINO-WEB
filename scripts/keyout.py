#!/usr/bin/env python3
"""
ECC Skill (`ecc-product-prompts`) — HSV Chroma-Key (#FF00FF) & Purple Despill Pipeline
Converts a Gemini Flash 1024x1024 #FF00FF magenta-isolated food layer JPEG/PNG into a
zero-fringe, auto-cropped 720px transparent .webp asset for 60 FPS GSAP Scrollytelling.

Usage:
  python3 scripts/keyout.py <input_image_path> <output_webp_path> [target_width=720]
"""

import os
import sys
import numpy as np
from PIL import Image, ImageFilter


def keyout_magenta_to_webp(input_path: str, output_path: str, target_width: int = 720) -> None:
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    diff = max_c - min_c

    # Compute Hue in [0, 360]
    h = np.zeros_like(max_c)
    mask_r = (max_c == r) & (diff > 0)
    mask_g = (max_c == g) & (diff > 0)
    mask_b = (max_c == b) & (diff > 0)

    h[mask_r] = (60.0 * ((g[mask_r] - b[mask_r]) / diff[mask_r]) + 360.0) % 360.0
    h[mask_g] = (60.0 * ((b[mask_g] - r[mask_g]) / diff[mask_g]) + 120.0) % 360.0
    h[mask_b] = (60.0 * ((r[mask_b] - g[mask_b]) / diff[mask_b]) + 240.0) % 360.0

    s = np.divide(diff, max_c, out=np.zeros_like(diff), where=max_c > 0)
    v = max_c / 255.0

    # Distance from pure magenta Hue = 300 deg
    hue_dist = np.minimum(np.abs(h - 300.0), 360.0 - np.abs(h - 300.0))
    purple_dominance = ((r + b) / 2.0 - g) / 255.0

    is_core_bg = ((hue_dist < 42.0) & (s > 0.25) & (v > 0.25)) | (
        (purple_dominance > 0.22) & (b > g * 1.25) & (r > g * 1.25)
    )
    is_edge_bg = (hue_dist < 52.0) & (s > 0.16) & (v > 0.18) & (purple_dominance > 0.10)

    alpha = np.ones_like(r) * 255.0
    alpha[is_core_bg] = 0.0

    edge_only = is_edge_bg & (~is_core_bg)
    ramp = np.clip(1.0 - (purple_dominance[edge_only] - 0.10) / 0.18, 0.0, 1.0)
    alpha[edge_only] = ramp * 255.0

    # 1px morphological erosion + Gaussian feathering
    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
    alpha_eroded = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_smooth = alpha_eroded.filter(ImageFilter.GaussianBlur(radius=1.1))
    final_alpha = np.array(alpha_smooth, dtype=np.float32)
    final_alpha = np.where(final_alpha < 18.0, 0.0, final_alpha)

    # Purple Despill on surviving boundary pixels
    despill_mask = (final_alpha > 0) & (purple_dominance > 0.04) & (b > g)
    spill_amount = np.clip((purple_dominance - 0.04) * 2.2, 0.0, 1.0)

    r_new = np.where(
        despill_mask,
        r * (1.0 - spill_amount * 0.25) + g * (spill_amount * 0.25),
        r,
    )
    b_new = np.where(
        despill_mask,
        b * (1.0 - spill_amount * 0.78) + g * (spill_amount * 0.78),
        b,
    )

    out_rgba = np.stack(
        [
            np.clip(r_new, 0, 255).astype(np.uint8),
            np.clip(g, 0, 255).astype(np.uint8),
            np.clip(b_new, 0, 255).astype(np.uint8),
            np.clip(final_alpha, 0, 255).astype(np.uint8),
        ],
        axis=-1,
    )

    res = Image.fromarray(out_rgba, mode="RGBA")
    bbox = res.getbbox()
    if bbox:
        pad = 16
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(res.width, bbox[2] + pad)
        y1 = min(res.height, bbox[3] + pad)
        res = res.crop((x0, y0, x1, y1))

    w, h_px = res.size
    if w > target_width:
        new_h = int(round(h_px * (target_width / float(w))))
        res = res.resize((target_width, new_h), Image.Resampling.LANCZOS)

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    res.save(output_path, "WEBP", quality=92, method=6)
    print(f"[ECC keyout] {input_path} -> {output_path} ({res.size[0]}x{res.size[1]})")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/keyout.py <input.jpg> <output.webp> [target_width=720]")
        sys.exit(1)
    in_file = sys.argv[1]
    out_file = sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 720
    keyout_magenta_to_webp(in_file, out_file, width)
