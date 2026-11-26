#!/usr/bin/env python3
"""
ECC Skill (`ecc-product-prompts`) — HSV Chroma-Key (#FF00FF) & Warm Crust Despill Pipeline
Converts a Gemini Flash #FF00FF magenta-isolated pizza layer JPEG/PNG into a zero-fringe,
auto-cropped, perspective-aligned transparent .webp asset for 60 FPS GSAP Scrollytelling.

Usage:
  python3 scripts/keyout.py <input_image_path> <output_webp_path> [target_width=960] [target_aspect]
"""

import os
import sys
import numpy as np
from PIL import Image, ImageFilter


def keyout_magenta_to_webp(
    input_path: str,
    output_path: str,
    target_width: int = 960,
    target_aspect: float | None = None,
) -> None:
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    border = np.concatenate(
        [data[0, :, :3], data[-1, :, :3], data[:, 0, :3], data[:, -1, :3]], axis=0
    )
    bg_rgb = np.median(border, axis=0)
    color_dist = np.sqrt(
        (r - bg_rgb[0]) ** 2 + (g - bg_rgb[1]) ** 2 + (b - bg_rgb[2]) ** 2
    )

    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    diff = max_c - min_c

    h = np.zeros_like(max_c)
    mask_r = (max_c == r) & (diff > 0)
    mask_g = (max_c == g) & (diff > 0)
    mask_b = (max_c == b) & (diff > 0)

    h[mask_r] = (60.0 * ((g[mask_r] - b[mask_r]) / diff[mask_r]) + 360.0) % 360.0
    h[mask_g] = (60.0 * ((b[mask_g] - r[mask_g]) / diff[mask_g]) + 120.0) % 360.0
    h[mask_b] = (60.0 * ((r[mask_b] - g[mask_b]) / diff[mask_b]) + 240.0) % 360.0

    s = np.divide(diff, max_c, out=np.zeros_like(diff), where=max_c > 0)
    v = max_c / 255.0

    hue_dist = np.minimum(np.abs(h - 305.0), 360.0 - np.abs(h - 305.0))
    purple_dom = ((r * 0.55 + b * 0.45) - g) / 255.0
    is_magenta_hue = (hue_dist < 38.0) & (b > g * 1.35) & (r > g * 1.35)

    is_core_bg = (color_dist < 48.0) | (is_magenta_hue & (s > 0.28) & (v > 0.30))
    is_edge_bg = (
        (hue_dist < 46.0)
        & (s > 0.18)
        & (v > 0.20)
        & (purple_dom > 0.12)
        & (b > g * 1.18)
    )

    alpha = np.ones_like(r) * 255.0
    alpha[is_core_bg] = 0.0

    edge_only = is_edge_bg & (~is_core_bg)
    ramp = np.clip(1.0 - (purple_dom[edge_only] - 0.12) / 0.18, 0.0, 1.0)
    alpha[edge_only] = ramp * 255.0

    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode="L")
    alpha_eroded = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_smooth = alpha_eroded.filter(ImageFilter.GaussianBlur(radius=1.15))
    final_alpha = np.array(alpha_smooth, dtype=np.float32)
    final_alpha = np.where(final_alpha < 20.0, 0.0, final_alpha)

    bounce_mask = (final_alpha > 0) & (b > g * 1.04) & (hue_dist < 50.0)
    spill = np.clip(((b - g) / 255.0) * 2.6, 0.0, 1.0)

    b_new = np.where(bounce_mask, b * (1.0 - spill * 0.88) + g * (spill * 0.88), b)
    r_new = np.where(bounce_mask, r * (1.0 - spill * 0.18) + g * (spill * 0.18), r)
    g_new = np.where(
        bounce_mask,
        g * (1.0 - spill * 0.05) + (r * 0.5 + g * 0.5) * (spill * 0.05),
        g,
    )

    out_rgba = np.stack(
        [
            np.clip(r_new, 0, 255).astype(np.uint8),
            np.clip(g_new, 0, 255).astype(np.uint8),
            np.clip(b_new, 0, 255).astype(np.uint8),
            np.clip(final_alpha, 0, 255).astype(np.uint8),
        ],
        axis=-1,
    )

    res = Image.fromarray(out_rgba, mode="RGBA")
    bbox = res.getbbox()
    if bbox:
        res = res.crop(bbox)

    w, h_px = res.size
    new_w = target_width
    if target_aspect is not None:
        new_h = int(round(new_w / target_aspect))
    else:
        new_h = int(round(h_px * (new_w / float(w))))

    res = res.resize((new_w, new_h), Image.Resampling.LANCZOS)
    padded = Image.new("RGBA", (new_w + 24, new_h + 24), (0, 0, 0, 0))
    padded.alpha_composite(res, (12, 12))

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    padded.save(output_path, "WEBP", quality=92, method=6)
    print(f"[ECC keyout] {input_path} -> {output_path} ({padded.size[0]}x{padded.size[1]})")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Usage: python3 scripts/keyout.py <input.jpg> <output.webp> [target_width=960] [target_aspect]"
        )
        sys.exit(1)
    in_file = sys.argv[1]
    out_file = sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 960
    aspect = float(sys.argv[4]) if len(sys.argv) > 4 else None
    keyout_magenta_to_webp(in_file, out_file, width, aspect)
