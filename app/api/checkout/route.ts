import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { email, businessName, businessType, plan } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia' as any,
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://draftkit.vercel.app';
  const isSingle = plan === 'single';

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: [
      {
        price: isSingle ? process.env.STRIPE_PRICE_SINGLE! : process.env.STRIPE_PRICE_MONTHLY!,
        quantity: 1,
      },
    ],
    mode: isSingle ? 'payment' : 'subscription',
    success_url: `${appUrl}/success`,
    cancel_url: `${appUrl}/signup`,
    customer_email: email,
    metadata: {
      businessName: businessName || '',
      businessType: businessType || '',
    },
  };

  if (!isSingle) {
    sessionParams.subscription_data = {
      trial_period_days: 14,
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  return NextResponse.json({ url: session.url });
}
