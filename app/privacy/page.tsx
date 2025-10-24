import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
            <p className="text-xl text-gray-600">Your privacy matters to us</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-12 shadow-lg rounded-lg border border-gray-100">
              <div className="space-y-12">
                {/* Introduction */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Welcome to Food Very Coffee. This privacy policy explains how we handle information when you use our representative application. 
                    We are committed to protecting your privacy and being transparent about our practices.
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Our Commitment</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">No Data Storage</h3>
                        <p className="text-gray-600">
                          We do not store, collect, or retain any personal information, data, or analytics from our users.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">Representative App</h3>
                        <p className="text-gray-600">
                          This is a representative application designed to showcase our coffee shop's offerings and information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What We Don't Do */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">What We Don't Do</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                      <p className="text-lg text-gray-600">We do not collect personal information</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                      <p className="text-lg text-gray-600">We do not track user behavior or analytics</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                      <p className="text-lg text-gray-600">We do not store cookies or local data</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                      <p className="text-lg text-gray-600">We do not share information with third parties</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                      <p className="text-lg text-gray-600">We do not require user registration or accounts</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="space-y-3">
                      <p className="text-lg text-gray-600">
                        If you have any questions about this privacy policy or our practices, please contact us:
                      </p>
                      <div className="space-y-2">
                        <p className="text-lg"><span className="font-semibold text-gray-900">Location:</span> Las Terrenas, Dominican Republic</p>
                        <p className="text-lg"><span className="font-semibold text-gray-900">Hours:</span> Monday - Sunday, 7:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Policy Updates</h2>
                  <p className="text-lg text-gray-600">
                    This privacy policy was last updated on January 15, 2025. We may update this policy from time to time, 
                    and any changes will be reflected on this page.
                  </p>
                </div>

                {/* Back to Home */}
                <div className="pt-8 border-t border-gray-200">
                  <Link href="/">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}