import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentationViewer() {
  const documentationContent = `
# Getting Started with Your SaaS Starter Kit

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/example/saas-starter-kit.git
   \`\`\`

2. Install dependencies:
   \`\`\`
   cd saas-starter-kit
   npm install
   \`\`\`

3. Set up environment variables:
   Copy the \`.env.example\` file to \`.env.local\` and fill in your Supabase and Stripe credentials.

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

## Project Structure

- \`/app\`: Contains all the Next.js 13 App Router pages and layouts
- \`/components\`: Reusable React components
- \`/lib\`: Utility functions and custom hooks
- \`/styles\`: Global styles and Tailwind CSS configuration

## Key Features

- User Authentication: Implemented using Supabase Auth
- Dashboard: A comprehensive dashboard for authenticated users
- Profile Management: Allow users to update their profile information
- Subscription Handling: Subscription management using Stripe
- API Integration: Examples of integrating with external APIs

## Customization

To customize the starter kit for your specific SaaS product:

1. Update the branding in \`/components/ui/logo.tsx\`
2. Modify the pricing information in \`/app/pricing/page.tsx\`
3. Add your own features and components as needed

For more detailed information, please refer to the full documentation.
  `

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: documentationContent }} />
        </div>
      </CardContent>
    </Card>
  )
}