-- Update admin dashboard to be protected with proper RLS
-- First create or update the admin user profile to have admin role
UPDATE public.profiles 
SET role = 'admin'::user_role, full_name = 'Admin User'
WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'joshuanyinaku48@gmail.com'
);

-- If no admin profile exists, create one when the user signs up
-- This will be handled by the handle_new_user trigger