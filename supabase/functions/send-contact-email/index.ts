import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Send email to business owner
    const businessEmailResponse = await resend.emails.send({
      from: "SweetBites Contact <onboarding@resend.dev>",
      to: ["joshuanyinaku48@gmail.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="background: #fff; padding: 20px; border-left: 4px solid #e91e63; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This message was sent from the SweetBites contact form.
        </p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "SweetBites <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #e91e63, #f06292); padding: 40px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Thank you, ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="padding: 30px 20px; background: #fff;">
            <h2 style="color: #333; margin-top: 0;">What happens next?</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <ul style="margin: 0; padding-left: 20px; color: #555;">
                <li style="margin-bottom: 10px;">Our team will review your message within 24 hours</li>
                <li style="margin-bottom: 10px;">We'll get back to you at <strong>${email}</strong></li>
                <li style="margin-bottom: 10px;">For urgent matters, call us at (555) 123-CAKE</li>
              </ul>
            </div>
            
            <div style="border-left: 4px solid #e91e63; padding-left: 20px; margin: 30px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="color: #666; line-height: 1.6;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="${Deno.env.get('SUPABASE_URL')}" 
                 style="background: #e91e63; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Browse Our Cakes
              </a>
            </div>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px;">
            <p style="margin: 0;">
              SweetBites Bakery<br>
              123 Sweet Street, Cake City, CC 12345<br>
              <a href="mailto:joshuanyinaku48@gmail.com" style="color: #e91e63;">joshuanyinaku48@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { businessEmailResponse, customerEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);