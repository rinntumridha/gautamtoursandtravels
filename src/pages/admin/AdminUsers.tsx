import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("user_roles").select("*").order("created_at").then(({ data }) => {
      setRoles((data as UserRole[]) || []);
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout title="Users">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm text-muted-foreground">
          Manage admin users. Role-based access (admin/editor/user) is supported for future expansion.
        </p>

        {loading ? <p className="text-muted-foreground">Loading...</p> : roles.length === 0 ? (
          <p className="text-muted-foreground">No users found.</p>
        ) : (
          <div className="space-y-2">
            {roles.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    {r.role === "admin" ? <Shield className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">{r.user_id}</p>
                    <p className="text-xs text-muted-foreground">Since {new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge>{r.role}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
