const whatsappNumber = "18099436616";
const whatsappMessage = encodeURIComponent(
  "Hola, quiero reservar o hacer un pedido en FoodVery Café."
);

export const socialLinks = {
  whatsapp: {
    label: "WhatsApp",
    href: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
    phone: "+1 (809) 943-6616",
    icon: "/Logos_Redes_Sociales/WhatsApp_icon.png",
  },
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/foodverycafe/",
    icon: "/Logos_Redes_Sociales/Instagram_icon.png",
  },
} as const;