import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

export const LanguageToggle = () => {
  const { language, switchLanguage } = useTranslation();

  return (
    <Select value={language} onValueChange={(value: 'en' | 'hi') => switchLanguage(value)}>
      <SelectTrigger className="w-[80px] h-8 border-none shadow-none">
        <Globe className="w-4 h-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="hi">हि</SelectItem>
      </SelectContent>
    </Select>
  );
};