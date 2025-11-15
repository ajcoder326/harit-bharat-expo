import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Settings, LogOut, CheckCircle, AlertCircle, Download } from "lucide-react";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  from: string;
  authConfigured: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [smtpConfig, setSmtpConfig] = useState<SmtpConfig | null>(null);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);
  const [isLoadingSmtp, setIsLoadingSmtp] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // SMTP form state
  const [smtpForm, setSmtpForm] = useState({
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: { user: "", pass: "" },
    from: "noreply@haritbharatexpo.com",
    recipients: "",
  });

  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password authentication (in production, use proper backend auth)
    if (adminPassword === "admin@2024") {
      setIsAuthenticated(true);
      toast({ title: "Logged in successfully" });
      loadRegistrations();
      loadSmtpConfig();
    } else {
      toast({
        title: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const loadRegistrations = async () => {
    setIsLoadingRegistrations(true);
    try {
      const response = await fetch("http://jodhpur.theharitbharat.com/api/registrations");
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      toast({
        title: "Error loading registrations",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRegistrations(false);
    }
  };

  const loadSmtpConfig = async () => {
    setIsLoadingSmtp(true);
    try {
      const response = await fetch("http://jodhpur.theharitbharat.com/api/smtp-config");
      const data = await response.json();
      setSmtpConfig(data);
      setSmtpForm((prev) => ({
        ...prev,
        host: data.host,
        port: data.port.toString(),
        secure: data.secure,
        from: data.from,
        recipients: data.recipients || "",
      }));
    } catch (error) {
      toast({
        title: "Error loading SMTP config",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSmtp(false);
    }
  };

  const handleUpdateSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://jodhpur.theharitbharat.com/api/smtp-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smtpForm),
      });

      if (!response.ok) throw new Error("Failed to update SMTP config");

      toast({ title: "SMTP configuration updated successfully" });
      loadSmtpConfig();
    } catch (error) {
      toast({
        title: "Error updating SMTP config",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleTestSmtp = async () => {
    setIsTestingSmtp(true);
    try {
      const response = await fetch("http://jodhpur.theharitbharat.com/api/smtp-test", {
        method: "POST",
      });

      if (!response.ok) throw new Error("SMTP connection failed");

      toast({ title: "SMTP connection successful!" });
    } catch (error) {
      toast({
        title: "SMTP connection failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    try {
      const response = await fetch(`http://jodhpur.theharitbharat.com/api/registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete registration");

      toast({ title: "Registration deleted successfully" });
      loadRegistrations();
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: "Error deleting registration",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCsv = () => {
    const headers = ["ID", "Full Name", "Email", "Phone", "Registered At"];
    const rows = registrations.map((reg) => [
      reg.id,
      reg.fullName,
      reg.email,
      reg.phone,
      new Date(reg.registeredAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-700">Harit Bharat Expo - Admin</h1>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setAdminPassword("");
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registrations">
              Registrations ({registrations.length})
            </TabsTrigger>
            <TabsTrigger value="smtp">SMTP Settings</TabsTrigger>
          </TabsList>

          {/* Registrations Tab */}
          <TabsContent value="registrations" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Visitor Registrations</CardTitle>
                  <CardDescription>All registrations for Harit Bharat Expo</CardDescription>
                </div>
                <Button
                  onClick={handleDownloadCsv}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingRegistrations ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No registrations yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Registered At</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell className="font-medium">{reg.fullName}</TableCell>
                            <TableCell>{reg.email}</TableCell>
                            <TableCell>{reg.phone}</TableCell>
                            <TableCell>
                              {new Date(reg.registeredAt).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteConfirm(reg.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMTP Settings Tab */}
          <TabsContent value="smtp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  SMTP Configuration
                </CardTitle>
                <CardDescription>
                  Configure your SMTP settings for sending registration confirmation emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {smtpConfig && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    {smtpConfig.authConfigured ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900">SMTP is configured</p>
                          <p className="text-sm text-green-700">
                            Email notifications are active
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-yellow-900">SMTP not configured</p>
                          <p className="text-sm text-yellow-700">
                            Please configure SMTP to enable email notifications
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <form onSubmit={handleUpdateSmtp} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="host">SMTP Host</Label>
                      <Input
                        id="host"
                        placeholder="smtp.gmail.com"
                        value={smtpForm.host}
                        onChange={(e) =>
                          setSmtpForm({ ...smtpForm, host: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="port">SMTP Port</Label>
                      <Input
                        id="port"
                        type="number"
                        placeholder="587"
                        value={smtpForm.port}
                        onChange={(e) =>
                          setSmtpForm({ ...smtpForm, port: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from">From Email Address</Label>
                    <Input
                      id="from"
                      type="email"
                      placeholder="noreply@haritbharatexpo.com"
                      value={smtpForm.from}
                      onChange={(e) =>
                        setSmtpForm({ ...smtpForm, from: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipient Email Addresses</Label>
                    <Input
                      id="recipients"
                      type="text"
                      placeholder="admin@example.com, manager@example.com"
                      value={smtpForm.recipients}
                      onChange={(e) =>
                        setSmtpForm({ ...smtpForm, recipients: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter email addresses separated by commas to receive registration notifications
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="user">Email/Username</Label>
                      <Input
                        id="user"
                        placeholder="your-email@gmail.com"
                        value={smtpForm.auth.user}
                        onChange={(e) =>
                          setSmtpForm({
                            ...smtpForm,
                            auth: { ...smtpForm.auth, user: e.target.value },
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pass">Password/App Password</Label>
                      <Input
                        id="pass"
                        type="password"
                        placeholder="Your app password"
                        value={smtpForm.auth.pass}
                        onChange={(e) =>
                          setSmtpForm({
                            ...smtpForm,
                            auth: { ...smtpForm.auth, pass: e.target.value },
                          })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        For Gmail: Use an App Password, not your account password
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="secure"
                      checked={smtpForm.secure}
                      onChange={(e) =>
                        setSmtpForm({ ...smtpForm, secure: e.target.checked })
                      }
                    />
                    <Label htmlFor="secure" className="cursor-pointer">
                      Use TLS/SSL (Secure connection)
                    </Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleTestSmtp}
                      disabled={isTestingSmtp}
                    >
                      {isTestingSmtp ? "Testing..." : "Test Connection"}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Save Configuration
                    </Button>
                  </div>
                </form>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Gmail Setup Guide:
                  </p>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Enable 2-Factor Authentication on your Gmail account</li>
                    <li>Go to myaccount.google.com/apppasswords</li>
                    <li>Select "Mail" and "Windows Computer"</li>
                    <li>Copy the generated password and paste it above</li>
                    <li>Use your Gmail address as the Email/Username</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Registration</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this registration? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteRegistration(deleteConfirm)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
