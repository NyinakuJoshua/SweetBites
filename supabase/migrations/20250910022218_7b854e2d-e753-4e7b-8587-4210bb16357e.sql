-- Update the profiles table to use a proper enum for roles
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('customer', 'admin');
    END IF;
END $$;

-- Add role column to profiles if it doesn't exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'customer';
    END IF;
END $$;

-- Create an admin user (replace with your actual admin email)
-- This will be useful for testing the admin functionality
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'joshuanyinaku48@gmail.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (email) DO NOTHING;

-- Create admin profile for the admin user
INSERT INTO public.profiles (user_id, full_name, role)
SELECT 
    u.id,
    'Admin User',
    'admin'::user_role
FROM auth.users u
WHERE u.email = 'joshuanyinaku48@gmail.com'
AND NOT EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = u.id
);

-- Update existing profile to admin if user already exists
UPDATE public.profiles 
SET role = 'admin'::user_role
WHERE user_id IN (
    SELECT id FROM auth.users WHERE email = 'joshuanyinaku48@gmail.com'
);