import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((s: any) => { map[s.setting_key] = s.setting_value || ""; });
      setSettings(map);
      setLoading(false);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").update({
        setting_value: value || null,
        updated_by: user?.id,
      }).eq("setting_key", key);
    }
    toast.success("Settings saved");
  };

  if (loading) return <AdminLayout title="Site Settings"><p className="text-muted-foreground">Loading...</p></AdminLayout>;

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Global SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Site Title</Label>
              <Input value={settings.site_title || ""} onChange={(e) => handleChange("site_title", e.target.value)} />
            </div>
            <div>
              <Label>Site Description</Label>
              <Textarea value={settings.site_description || ""} onChange={(e) => handleChange("site_description", e.target.value)} rows={2} />
            </div>
            <div>
              <Label>Favicon URL</Label>
              <Input value={settings.favicon_url || ""} onChange={(e) => handleChange("favicon_url", e.target.value)} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Robots.txt</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={settings.robots_txt || ""}
              onChange={(e) => handleChange("robots_txt", e.target.value)}
              rows={8}
              className="font-mono text-xs"
            />
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="gap-1">
          <Save className="h-4 w-4" /> Save All Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
