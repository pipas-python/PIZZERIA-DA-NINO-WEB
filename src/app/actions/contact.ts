"use server";

export interface ContactActionState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: {
    restaurantName?: string;
    dishFocus?: string;
    contactChannel?: string;
  };
  submission?: {
    referenceCode: string;
    restaurantName: string;
    dishFocus: string;
    contactChannel: string;
    whatsappUrl: string;
  };
}

type ActionLocale = "de" | "en" | "es";

const ACTION_MESSAGES: Record<
  ActionLocale,
  {
    nameMin: string;
    nameMax: string;
    contactInvalid: string;
    checkFields: string;
    defaultFocus: string;
    whatsappTemplate: (
      name: string,
      focus: string,
      cartSummary: string,
      ref: string,
      contact: string,
    ) => string;
  }
> = {
  de: {
    nameMin: "Bitte gib deinen Namen ein (mind. 2 Zeichen).",
    nameMax: "Der Name darf maximal 80 Zeichen lang sein.",
    contactInvalid:
      "Bitte gib deine Telefonnummer oder E-Mail-Adresse (und optional deine Wunschzeit) an.",
    checkFields: "Bitte überprüfe die markierten Felder vor dem Absenden.",
    defaultFocus: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
    whatsappTemplate: (name, focus, cartSummary, ref, contact) =>
      `Ciao Pizzeria Da Nino (Belpstrasse 65)! Anfrage von ${name} [${ref}] — ${focus}.${
        cartSummary ? ` Auswahl: ${cartSummary}.` : ""
      } Kontakt / Wunschzeit: ${contact}`,
  },
  en: {
    nameMin: "Please enter your name (minimum 2 characters).",
    nameMax: "The name must not exceed 80 characters.",
    contactInvalid:
      "Please enter your phone number or email address (and optional pickup/table time).",
    checkFields: "Please check the highlighted fields before submitting.",
    defaultFocus: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
    whatsappTemplate: (name, focus, cartSummary, ref, contact) =>
      `Ciao Pizzeria Da Nino (Belpstrasse 65)! Order/Reservation from ${name} [${ref}] — ${focus}.${
        cartSummary ? ` Items: ${cartSummary}.` : ""
      } Contact / Time: ${contact}`,
  },
  es: {
    nameMin: "Por favor, ingresa tu nombre (mínimo 2 caracteres).",
    nameMax: "El nombre no debe superar los 80 caracteres.",
    contactInvalid:
      "Ingresa tu teléfono o correo electrónico (y opcionalmente tu hora de recogida/reserva).",
    checkFields: "Revisa los campos marcados antes de enviar tu solicitud.",
    defaultFocus: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
    whatsappTemplate: (name, focus, cartSummary, ref, contact) =>
      `¡Ciao Pizzeria Da Nino (Belpstrasse 65)! Pedido/Reserva de ${name} [${ref}] — ${focus}.${
        cartSummary ? ` Selección: ${cartSummary}.` : ""
      } Contacto / Hora: ${contact}`,
  },
};

function buildWhatsappUrl(
  locale: ActionLocale,
  customerName: string,
  dishFocus: string,
  cartSummary: string,
  contactChannel: string,
  refCode: string,
) {
  const customBase = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
  const text = ACTION_MESSAGES[locale].whatsappTemplate(
    customerName,
    dishFocus,
    cartSummary,
    refCode,
    contactChannel,
  );

  if (customBase) {
    if (customBase.includes("wa.me") || customBase.includes("whatsapp.com")) {
      const separator = customBase.includes("?") ? "&" : "?";
      return `${customBase}${separator}text=${encodeURIComponent(text)}`;
    }
    return customBase;
  }

  return `https://wa.me/41313711131?text=${encodeURIComponent(text)}`;
}

export async function submitBriefAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const rawLocale = String(formData.get("locale") ?? "de").trim();
  const locale: ActionLocale =
    rawLocale === "de" || rawLocale === "es" || rawLocale === "en" ? rawLocale : "de";
  const msg = ACTION_MESSAGES[locale];

  // Honeypot anti-bots
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot.length > 0) {
    return {
      status: "success",
      submission: {
        referenceCode: "DN-0000",
        restaurantName: "Gast",
        dishFocus: msg.defaultFocus,
        contactChannel: "",
        whatsappUrl: "https://wa.me/41313711131",
      },
    };
  }

  const restaurantName = String(formData.get("restaurantName") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const dishFocusRaw = String(formData.get("dishFocus") ?? "").trim();
  const cartSummary = String(formData.get("cartSummary") ?? "").trim();
  const contactChannel = String(formData.get("contactChannel") ?? "").trim();

  const fieldErrors: NonNullable<ContactActionState["fieldErrors"]> = {};

  if (restaurantName.length < 2) {
    fieldErrors.restaurantName = msg.nameMin;
  } else if (restaurantName.length > 80) {
    fieldErrors.restaurantName = msg.nameMax;
  }

  const dishFocus = dishFocusRaw.length > 0 ? dishFocusRaw.slice(0, 120) : msg.defaultFocus;

  const hasEmailOrPhone =
    contactChannel.includes("@") || /\d{5,}/.test(contactChannel.replace(/\s+/g, ""));
  if (!hasEmailOrPhone) {
    fieldErrors.contactChannel = msg.contactInvalid;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: msg.checkFields,
      fieldErrors,
    };
  }

  const referenceCode = `DN-${Date.now().toString(36).slice(-4).toUpperCase()}`;
  const fullFocus = cartSummary ? `${dishFocus} · [${cartSummary}]` : dishFocus;
  const whatsappUrl = buildWhatsappUrl(
    locale,
    restaurantName,
    dishFocus,
    cartSummary,
    contactChannel,
    referenceCode,
  );

  return {
    status: "success",
    submission: {
      referenceCode,
      restaurantName,
      dishFocus: fullFocus,
      contactChannel,
      whatsappUrl,
    },
  };
}
