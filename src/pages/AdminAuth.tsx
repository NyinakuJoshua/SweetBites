import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Shield, LogOut } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function AdminAuth() {
  const { user, loading, signIn, signOut } = useAuth();
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();
          
          setIsAdmin(profile?.role === 'admin');
        } catch (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        }
      }
      setCheckingAdmin(false);
    };

    checkAdminRole();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle className="text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You don't have administrator privileges. Please contact the system administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Signed in as: {user.email}</p>
              <Button 
                onClick={signOut}
                variant="outline" 
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (!error) {
      // Check if user is admin after successful sign in
      toast({
        title: "Checking admin privileges...",
        description: "Please wait while we verify your access level."
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Shield className="text-primary-foreground h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <Card className="backdrop-blur-sm bg-background/95">
          <CardHeader className="text-center">
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>Enter your admin credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your admin password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Shield className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Signing in...' : 'Sign In as Admin'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}