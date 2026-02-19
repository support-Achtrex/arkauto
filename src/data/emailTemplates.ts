export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    description: string;
    html: string;
    category: 'transactional' | 'marketing' | 'account';
}

export const emailTemplates: EmailTemplate[] = [
    {
        id: 'tpl-001',
        name: 'Welcome Email',
        subject: 'Welcome to ArkAuto - Your Journey Starts Here!',
        description: 'Sent to new users upon registration.',
        category: 'account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="background-color: #e31e24; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">ArkAuto</h1>
                </div>
                <div style="padding: 30px;">
                    <h2>Welcome to the Family!</h2>
                    <p>Hi {{name}},</p>
                    <p>We're thrilled to have you with us. ArkAuto is your one-stop shop for genuine auto parts and expert advice.</p>
                    <p>Start exploring our catalog today and find exactly what your vehicle needs.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{site_url}}/catalog" style="background-color: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore Catalog</a>
                    </div>
                    <p>Best regards,<br>The ArkAuto Team</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                    &copy; 2026 ArkAuto. All rights reserved.
                </div>
            </div>
        `
    },
    {
        id: 'tpl-002',
        name: 'Order Confirmation',
        subject: 'Your ArkAuto Order #{{order_id}} has been received',
        description: 'Sent after a successful purchase.',
        category: 'transactional',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="background-color: #e31e24; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">ArkAuto</h1>
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #2e7d32;">Order Confirmed!</h2>
                    <p>Hi {{name}},</p>
                    <p>Good news! We've received your order <strong>#{{order_id}}</strong> and our team is already getting it ready for shipment.</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Order Summary</h3>
                        {{order_items}}
                        <hr style="border: 0; border-top: 1px solid #ddd;">
                        <p style="text-align: right; font-weight: bold;">Total: {{order_total}}</p>
                    </div>
                    <p>We'll notify you as soon as your parts are on their way.</p>
                    <p>Best regards,<br>The ArkAuto Team</p>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-003',
        name: 'Flash Sale: Brakes',
        subject: '🛑 Stop Everything! 50% Off Premium Brake Pads',
        description: 'Marketing campaign for brake components.',
        category: 'marketing',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 0;">
                    <img src="https://placehold.co/600x300/e31e24/ffffff?text=FLASH+SALE+50%+OFF" alt="Flash Sale" style="width: 100%; display: block;">
                </div>
                <div style="padding: 30px; text-align: center;">
                    <h1 style="color: #e31e24; font-size: 32px; margin-bottom: 10px;">HUGE SAVINGS!</h1>
                    <p style="font-size: 18px; color: #333;">This weekend only, get up to 50% off all Brembo and Akebono brake pads.</p>
                    <p>Don't compromise on your safety. Upgrade to premium braking performance for half the price.</p>
                    <div style="margin: 30px 0;">
                        <a href="{{site_url}}/category/brakes" style="background-color: #e31e24; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px;">Shop Brakes Now</a>
                    </div>
                    <p style="font-size: 12px; color: #999;">*Offer ends Sunday at midnight. While stocks last.</p>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-004',
        name: 'Abandoned Cart',
        subject: 'Psst... You forgot something in your cart!',
        description: 'Triggered when a user leaves items in their cart.',
        category: 'marketing',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 30px; text-align: center;">
                    <h2 style="color: #333;">Wait! Your car is still waiting...</h2>
                    <p>We noticed you left some items in your cart. They are ready and waiting to be shipped to your doorstep!</p>
                    <div style="margin: 20px 0; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                        {{cart_items_preview}}
                    </div>
                    <p>To make it even better, use code <strong>SAVE10</strong> for 10% off if you complete your order in the next 2 hours!</p>
                    <div style="margin: 30px 0;">
                        <a href="{{site_url}}/cart" style="background-color: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Finish Checkout</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-005',
        name: 'Account Activated',
        subject: 'Your ArkAuto Account is Now Active!',
        description: 'Sent after admin approves a pending account.',
        category: 'account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="background-color: #2e7d32; padding: 20px; text-align: center;">
                    <h1 style="color: white; margin: 0;">ArkAuto Verified</h1>
                </div>
                <div style="padding: 30px;">
                    <h2>Account Approved!</h2>
                    <p>Hi {{name}},</p>
                    <p>Your business/individual account has been reviewed and approved by our team. You now have full access to our tiered billing and wholesale pricing (if applicable).</p>
                    <p>Sign in now to access your dashboard and saved vehicle specs.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{site_url}}/account" style="background-color: #2e7d32; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                    </div>
                    <p>Welcome aboard,<br>The Registry Team</p>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-006',
        name: 'Maintenance Reminder',
        subject: '🕒 Time for your 5,000-mile service?',
        description: 'Personalized reminder based on purchase history.',
        category: 'marketing',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 30px;">
                    <h2 style="color: #333;">Keep it running like new.</h2>
                    <p>Hi {{name}},</p>
                    <p>It's been a few months since your last oil change. Regular maintenance is the key to vehicle longevity and performance.</p>
                    <h3>Recommended for your {{vehicle_model}}:</h3>
                    <ul style="color: #555;">
                        <li>Full Synthetic Motor Oil (5W-30)</li>
                        <li>High-Flow Oil Filter</li>
                        <li>Air Filter Inspection</li>
                    </ul>
                    <div style="margin: 30px 0;">
                        <a href="{{site_url}}/catalog?q=service+kit" style="background-color: #e31e24; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Shop Maintenance Kits</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-007',
        name: 'New Product Notification',
        subject: '🚀 New Arrival: High-Performance Exhaust Systems',
        description: 'Alert for new inventory arrivals.',
        category: 'marketing',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 0;">
                    <img src="https://placehold.co/600x300/111111/ffffff?text=NEW+PERFORMANCE+PARTS" alt="New Arrival" style="width: 100%; display: block;">
                </div>
                <div style="padding: 30px;">
                    <h2 style="color: #111;">Turn heads with the new MagnaFlow series.</h2>
                    <p>We've just stocked the latest Street Series Performance Exhaust systems. Better sound, better air flow, better performance.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="{{site_url}}/product/ex-001" style="background-color: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Details</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-008',
        name: 'Wholesale Application Received',
        subject: 'ArkAuto - Wholesale Application Under Review',
        description: 'Auto-response to new business applicants.',
        category: 'account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 30px;">
                    <h2 style="color: #333;">We've received your application.</h2>
                    <p>Thank you for your interest in becoming a wholesale partner with ArkAuto. Our administrative team is currently verifying your business credentials.</p>
                    <p>This process typically takes <strong>2-3 business days</strong>. We will notify you via this email address once our review is complete.</p>
                    <p>In the meantime, feel free to browse our standard catalog.</p>
                    <p>Warm regards,<br>B2B Support Team</p>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-009',
        name: 'Password Reset',
        subject: 'Action Required: Reset your ArkAuto password',
        description: 'Standard security reset email.',
        category: 'account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="padding: 40px; text-align: center;">
                    <h2 style="color: #333;">Reset Your Password</h2>
                    <p>We received a request to reset the password for your ArkAuto account.</p>
                    <div style="margin: 30px 0;">
                        <a href="{{reset_url}}" style="background-color: #333; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Change Password</a>
                    </div>
                    <p style="color: #999; font-size: 12px;">If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
                </div>
            </div>
        `
    },
    {
        id: 'tpl-010',
        name: 'Monthly Recommended',
        subject: 'Top Trending Parts for Your Region 🌍',
        description: 'Regional marketing newsletter.',
        category: 'marketing',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
                <div style="background-color: #f5f5f5; padding: 40px; text-align: center;">
                    <h1 style="color: #111;">Trending in {{location}}</h1>
                    <p>See what other drivers in your area are buying to stay ahead of the curve.</p>
                </div>
                <div style="padding: 30px;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                        {{trending_products_grid}}
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="{{site_url}}/catalog" style="color: #e31e24; font-weight: bold; text-decoration: none;">View All Trending Items &rarr;</a>
                    </div>
                </div>
            </div>
        `
    }
];
