import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { translateFor } from "@/i18n/utils";

type Translator = ReturnType<typeof translateFor>;

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/yousef8/astro-paper-i18n",
    linkTitle: (t: Translator) => t("socials.github"),
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/username",
    linkTitle: (t: Translator) => t("socials.x"),
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/username/",
    linkTitle: (t: Translator) => t("socials.linkedin"),
    icon: IconLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: (t: Translator) => t("socials.mail"),
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: (t: Translator) => t("sharePost.via", { media: "WhatsApp" }),
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "Facebook" }),
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "X" }),
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: (t: Translator) => t("sharePost.via", { media: "Telegram" }),
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "Pinterest" }),
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: (t: Translator) => t("sharePost.via", { media: "Mail" }),
    icon: IconMail,
  },
] as const;
