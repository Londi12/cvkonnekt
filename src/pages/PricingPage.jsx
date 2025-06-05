import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid';
import SubscriptionModal from '../components/payment/SubscriptionModal';

const tiers = [
  {
    name: 'Free',
    id: 'free',
    href: '/signup',
    price: { monthly: 'R0', annually: 'R0' },
    description: 'Perfect for trying out our basic features',
    features: [
      '1 CV Generation',
      'Basic Templates',
      'PDF Download',
      'Email Support',
    ],
    buttonText: 'Get started',
    featured: false,
    idealFor: 'New users testing the platform',
    icon: '🔹'
  },
  {
    name: 'Premium',
    id: 'premium',
    href: '/subscribe/premium',
    price: { monthly: 'R99', annually: 'R999' },
    description: 'For professionals who need polished applications',
    features: [
      'Up to 10 CV Generations',
      'Up to 10 Cover Letters',
      'All Premium Templates',
      'PDF & Word Downloads',
      'Cover Letter Builder',
      'Priority Support',
    ],
    buttonText: 'Subscribe now',
    featured: true,
    idealFor: 'Serious job seekers, students, immigration candidates',
    icon: '🔸',
    savePercent: 15
  },
  {
    name: 'Pro',
    id: 'pro',
    href: '/subscribe/pro',
    price: { monthly: 'R199', annually: 'R1999' },
    description: 'Unlimited tools for career-driven users',
    features: [
      'Unlimited CV Generations',
      'Unlimited Cover Letters',
      'Priority Template Access',
      'Advanced Formatting Options',
      'VIP Support (fastest response time)',
    ],
    buttonText: 'Subscribe now',
    featured: false,
    idealFor: 'Frequent applicants, professionals applying globally',
    icon: '🔶',
    savePercent: 15
  },
];

const faqs = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes basic CV creation with limited templates and one free CV download. It's perfect for trying out our service.",
  },
  {
    question: "How does the subscription work?",
    answer: "Subscriptions are billed monthly or annually. You can cancel anytime, and you'll maintain access until the end of your billing period.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can upgrade or downgrade at any time. When upgrading, you'll be charged a prorated amount for the remaining days in your billing cycle.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use Yoco, a PCI-DSS Level 1 Service Provider, to handle all payment information. We don't store your credit card details on our servers.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = (planId, event) => {
    event.preventDefault();
    // Navigate to the subscription page for the selected plan
    window.location.href = `/subscribe/${planId}`;
  };

  return (
    <>
      {/* Subscription modal removed - now using dedicated subscription page */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              The right price for you, <br className="hidden sm:inline lg:hidden" />
              whoever you are
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Choose an affordable plan that's packed with the best features for your job search needs.
          </p>
          
          {/* Toggle between monthly and annual billing */}
          <div className="mt-16 flex justify-center">
            <div className="relative rounded-full bg-gray-200 p-0.5">
              <button
                type="button"
                className="relative whitespace-nowrap rounded-full bg-white py-2 px-6 text-sm font-semibold text-gray-900 shadow-sm"
              >
                Monthly billing
              </button>
              <button
                type="button"
                className="ml-0.5 relative whitespace-nowrap rounded-full py-2 px-6 text-sm font-semibold text-gray-700"
              >
                Annual billing
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10'
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                {tier.price.annually !== 'Custom' && (
                  <p className="mt-2 text-sm text-gray-500">
                    or {tier.price.annually}/year (save {tier.savePercent}%)
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500 italic">
                  {tier.idealFor && `Ideal for: ${tier.idealFor}`}
                </p>
                <button
                  onClick={(e) => handleSubscribe(tier.id, e)}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                      : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                    'w-full mt-6 rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                  )}
                >
                  {tier.buttonText}
                </button>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="pt-6">
                  <dt>
                    <span className="text-base font-semibold leading-7 text-gray-900">{faq.question}</span>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
