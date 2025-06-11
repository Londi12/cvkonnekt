import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container px-4 md:px-6 py-8 mx-auto">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <h3 className="text-lg font-medium">CVKonnekt</h3>
            <p className="text-sm text-gray-600">
              Professional CV and cover letter builder for South African job seekers. Built with ❤️ in South Africa.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">CV</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/cv-templates">
                  CV Templates
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/cv-examples">
                  CV Examples
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/create">
                  CV Builder
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Cover Letter</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/cover-letter-templates">
                  Cover Letter Templates
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/cover-letter-examples">
                  Cover Letter Examples
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/create-cover-letter">
                  Cover Letter Builder
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-emerald-600 transition-colors" href="/help">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-8 mt-8 gap-4">
          <p className="text-xs text-gray-600 text-center sm:text-left">© 2024 CVKonnekt. All rights reserved. Made with ❤️ for South Africa.</p>
          <div className="flex gap-6">
            <Link className="text-xs text-gray-600 hover:text-emerald-600 transition-colors" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs text-gray-600 hover:text-emerald-600 transition-colors" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
