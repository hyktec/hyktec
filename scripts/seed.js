const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Hyktec Database Seed...');

  // Clean existing tables
  await prisma.activityLog.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.invoiceItem.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.ticketMessage.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.milestone.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.pricingPlan.deleteMany({});
  await prisma.portfolioProject.deleteMany({});
  await prisma.websiteSetting.deleteMany({});

  // 1. Create Users
  const adminPassword = await bcrypt.hash('Hyktec2026!', 10);
  const clientPassword = await bcrypt.hash('Client2026!', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hyktec.com',
      passwordHash: adminPassword,
      name: 'Hyktec System Administrator',
      role: 'super_admin',
      company: 'HYKTEC',
      phone: '+1 (800) 555-HYKTEC',
      status: 'active',
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: 'client@acmecorp.com',
      passwordHash: clientPassword,
      name: 'Sarah Jenkins',
      role: 'client',
      company: 'Acme Global Corp',
      phone: '+1 (555) 234-5678',
      status: 'active',
    },
  });

  console.log('✅ Admin & Client users seeded.');

  // 2. Create Client Record
  const clientRecord = await prisma.client.create({
    data: {
      userId: clientUser.id,
      companyName: 'Acme Global Corp',
      industry: 'Enterprise Software & Retail',
      country: 'United States',
      website: 'https://acmeglobalcorp.example.com',
      notes: 'Enterprise account with active web app and AI integration contract.',
    },
  });

  // 3. Create Project
  const project = await prisma.project.create({
    data: {
      clientId: clientRecord.id,
      name: 'Acme Enterprise SaaS Portal & AI Suite',
      serviceType: 'Web Development & AI Solutions',
      status: 'development',
      progress: 68,
      budget: 32000.0,
      startDate: '2026-06-01',
      endDate: '2026-10-15',
      description: 'Building a next-generation SaaS client management portal with integrated AI workflow agents.',
    },
  });

  // Milestones
  await prisma.milestone.createMany({
    data: [
      { projectId: project.id, title: 'Discovery & Architecture Blueprint', status: 'completed', dueDate: '2026-06-15' },
      { projectId: project.id, title: 'UI/UX Interactive Prototypes', status: 'completed', dueDate: '2026-07-01' },
      { projectId: project.id, title: 'Core Web Platform & RBAC Engine', status: 'in_progress', dueDate: '2026-08-30' },
      { projectId: project.id, title: 'AI Assistant & API Automation', status: 'pending', dueDate: '2026-09-20' },
      { projectId: project.id, title: 'Security QA & Final Launch', status: 'pending', dueDate: '2026-10-15' },
    ],
  });

  // Tasks
  await prisma.task.createMany({
    data: [
      { projectId: project.id, title: 'Setup OAuth2 & Role-Based Auth', status: 'done', priority: 'high', dueDate: '2026-07-10' },
      { projectId: project.id, title: 'Implement Responsive Client Dashboard UI', status: 'in_progress', priority: 'medium', dueDate: '2026-08-25' },
      { projectId: project.id, title: 'Connect Open-AI Assistant API Webhooks', status: 'todo', priority: 'urgent', dueDate: '2026-09-05' },
      { projectId: project.id, title: 'Configure Invoice PDF Export Tool', status: 'done', priority: 'medium', dueDate: '2026-08-15' },
    ],
  });

  // 4. Tickets
  const ticket = await prisma.ticket.create({
    data: {
      ticketNum: 'TICK-9081',
      clientId: clientRecord.id,
      subject: 'Request for custom API rate limit increase for staging environment',
      category: 'feature',
      priority: 'high',
      status: 'in_progress',
    },
  });

  await prisma.ticketMessage.createMany({
    data: [
      {
        ticketId: ticket.id,
        senderId: clientUser.id,
        senderType: 'client',
        message: 'Hi Hyktec Support, we are testing automated stress loads and need our API rate limits doubled for staging.',
      },
      {
        ticketId: ticket.id,
        senderId: adminUser.id,
        senderType: 'admin',
        message: 'Hello Sarah! Our DevOps team has updated your staging rate limits to 5,000 req/min. Let us know if you need anything else.',
      },
    ],
  });

  // 5. Invoices
  const inv1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      clientId: clientRecord.id,
      projectId: project.id,
      amount: 12500.0,
      tax: 625.0,
      discount: 0.0,
      status: 'paid',
      dueDate: '2026-06-30',
      paidAt: '2026-06-28',
      notes: 'Deposit & Phase 1 Design Delivery',
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv1.id,
      description: 'Phase 1: Product Architecture, Wireframes & UI Prototypes',
      quantity: 1,
      unitPrice: 12500.0,
      amount: 12500.0,
    },
  });

  const inv2 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-002',
      clientId: clientRecord.id,
      projectId: project.id,
      amount: 9500.0,
      tax: 475.0,
      discount: 0.0,
      status: 'pending',
      dueDate: '2026-09-01',
      notes: 'Phase 2 Development Milestone',
    },
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId: inv2.id,
      description: 'Phase 2: Core Platform Development & API Integrations',
      quantity: 1,
      unitPrice: 9500.0,
      amount: 9500.0,
    },
  });

  // 6. Documents
  await prisma.document.createMany({
    data: [
      {
        clientId: clientRecord.id,
        projectId: project.id,
        title: 'Acme_Platform_Master_Service_Agreement.pdf',
        category: 'contract',
        fileUrl: '/uploads/documents/msa_acme_signed.pdf',
        fileSize: '2.4 MB',
      },
      {
        clientId: clientRecord.id,
        projectId: project.id,
        title: 'Acme_SaaS_Architecture_Specification_v2.pdf',
        category: 'proposal',
        fileUrl: '/uploads/documents/architecture_v2.pdf',
        fileSize: '5.1 MB',
      },
    ],
  });

  // 7. Leads
  await prisma.lead.createMany({
    data: [
      {
        name: 'David Miller',
        company: 'Apex Financial Services',
        email: 'david@apexfin.example.com',
        phone: '+1 (555) 987-6543',
        country: 'United States',
        service: 'Web Development',
        budget: '$15,000 - $30,000',
        projectType: 'Web Application',
        expectedTimeline: '2 - 3 Months',
        description: 'We need a modern portal for our investment clients with real-time portfolio charts and document signing.',
        status: 'proposal_sent',
        notes: 'Sent detailed $24,000 proposal on Aug 12. Awaiting board review.',
      },
      {
        name: 'Elena Rostova',
        company: 'Nexus Health Technologies',
        email: 'elena@nexushealth.example.com',
        phone: '+44 20 7946 0912',
        country: 'United Kingdom',
        service: 'App Development',
        budget: '$30,000 - $50,000',
        projectType: 'Mobile App',
        expectedTimeline: '3 - 6 Months',
        description: 'Cross-platform iOS and Android app for patient telemedicine scheduling and vitals monitoring.',
        status: 'won',
        notes: 'Contract signed. Onboarding scheduled for next week.',
      },
      {
        name: 'Marcus Vance',
        company: 'Vanguard Global Commerce',
        email: 'marcus@vanguard.example.com',
        phone: '+1 (555) 444-3210',
        country: 'Canada',
        service: 'AI Solutions',
        budget: '$10,000 - $20,000',
        projectType: 'AI Automation',
        expectedTimeline: '1 - 2 Months',
        description: 'Autonomous customer support agent to handle refunds, order tracking, and FAQ responses.',
        status: 'contacted',
        notes: 'Discovery call held on Aug 18. Preparing scope document.',
      },
    ],
  });

  // 8. Pricing Plans
  await prisma.pricingPlan.createMany({
    data: [
      // Website
      { category: 'Website', name: 'Starter', price: '$1,499', period: 'one-time', featuresJson: JSON.stringify(['Custom Modern 5-Page Website', 'Responsive Mobile Design', 'Fast Performance Optimization', 'Basic SEO Setup', 'Contact Form & Lead Capture', '30 Days Free Support']), isPopular: false, sortOrder: 1 },
      { category: 'Website', name: 'Business', price: '$3,499', period: 'one-time', featuresJson: JSON.stringify(['Up to 12 Custom Pages', 'Full CMS Integration', 'Advanced SEO & Schema', 'Blog & Resource Platform', 'Analytics & Lead Tracking', '60 Days Free Support']), isPopular: true, sortOrder: 2 },
      { category: 'Website', name: 'Enterprise', price: '$7,999', period: 'one-time', featuresJson: JSON.stringify(['Unlimited Custom Pages & Portals', 'Headless CMS Architecture', 'Custom Web Applications', 'API & CRM Integrations', 'High Security Hardening', 'Dedicated Account Manager']), isPopular: false, sortOrder: 3 },
      // App Development
      { category: 'App Development', name: 'MVP', price: '$5,999', period: 'one-time', featuresJson: JSON.stringify(['Cross-Platform (iOS & Android)', 'Core Feature Implementation', 'Clean UI/UX Design', 'Backend API Integration', 'App Store Submission', '30 Days Warranty']), isPopular: false, sortOrder: 1 },
      { category: 'App Development', name: 'Business', price: '$12,499', period: 'one-time', featuresJson: JSON.stringify(['Advanced Cross-Platform App', 'User Auth & Push Notifications', 'In-App Purchases & Payments', 'Custom Admin Dashboard', 'Analytics Integration', '90 Days Support']), isPopular: true, sortOrder: 2 },
      // Digital Marketing
      { category: 'Digital Marketing', name: 'Growth', price: '$1,999', period: '/month', featuresJson: JSON.stringify(['Comprehensive Technical SEO', 'Google Ads Campaign Management', 'Social Media Content Creation', 'Monthly Performance Reports', 'Conversion Rate Optimization']), isPopular: true, sortOrder: 1 },
      // AI Solutions
      { category: 'AI Solutions', name: 'AI Starter', price: '$2,999', period: 'one-time', featuresJson: JSON.stringify(['Custom AI Chatbot Integration', 'Trained on Your Business Data', 'Website & CRM Embeds', 'Workflow Automation Setup', 'Staff Training & Support']), isPopular: false, sortOrder: 1 },
      { category: 'AI Solutions', name: 'AI Enterprise', price: '$8,500', period: 'one-time', featuresJson: JSON.stringify(['Autonomous AI Business Agents', 'Multi-System Process Automation', 'Custom LLM Fine-Tuning', 'Advanced Analytics Engine', 'Continuous Optimization']), isPopular: true, sortOrder: 2 },
    ],
  });

  // 9. Portfolio Projects
  await prisma.portfolioProject.createMany({
    data: [
      {
        title: 'Nexus Health Telemedicine Platform',
        slug: 'nexus-health-telemedicine',
        category: 'Mobile Apps',
        clientName: 'Nexus Health Systems',
        industry: 'Healthcare',
        challenge: 'Nexus required an intuitive mobile experience allowing patients to book virtual doctor appointments, access encrypted records, and connect live.',
        solution: 'Hyktec developed a HIPAA-compliant cross-platform mobile application powered by encrypted video streams and automated appointment scheduling.',
        result: 'Achieved 4.9-star store rating, reduced missed appointments by 42%, and served over 100,000 active patients.',
        technologiesJson: JSON.stringify(['Flutter', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS']),
        liveUrl: 'https://nexushealth.example.com',
        featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      },
      {
        title: 'Vanguard AI Autonomous Support Agent',
        slug: 'vanguard-ai-support',
        category: 'AI Solutions',
        clientName: 'Vanguard Commerce',
        industry: 'E-commerce',
        challenge: 'Handling over 5,000 daily customer inquiries regarding orders, shipping, and returns with a small support team.',
        solution: 'Deployed a custom AI Agent trained on product catalogs and order databases, capable of executing refund requests and tracking shipments autonomously.',
        result: 'Automated 78% of customer tickets instantly, reduced response time from 4 hours to 3 seconds, and saved $140,000 annually.',
        technologiesJson: JSON.stringify(['Python', 'OpenAI API', 'LangChain', 'Next.js', 'Redis']),
        liveUrl: 'https://vanguard.example.com',
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      },
      {
        title: 'Apex Global Financial Portal',
        slug: 'apex-financial-portal',
        category: 'Web Applications',
        clientName: 'Apex Capital Group',
        industry: 'FinTech',
        challenge: 'Legacy portal had high latency, poor mobile responsiveness, and lacked real-time portfolio analytics for institutional investors.',
        solution: 'Built a high-frequency Next.js React platform backed by SQLite/PostgreSQL caching, sub-second data streaming, and bank-grade encryption.',
        result: 'Increased user engagement by 180%, reduced page load time from 4.8s to 0.4s, and processed over $500M in transaction volume.',
        technologiesJson: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma']),
        liveUrl: 'https://apexfin.example.com',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      },
    ],
  });

  // 10. Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'How Autonomous AI Agents Are Revolutionizing Enterprise Workflow in 2026',
        slug: 'autonomous-ai-agents-revolutionizing-enterprise-2026',
        category: 'AI Solutions',
        author: 'Hyktec AI Engineering Team',
        excerpt: 'Discover how modern AI agents go beyond basic chatbots to execute multi-step workflows, integrate backend systems, and boost business efficiency.',
        content: `
# How Autonomous AI Agents Are Revolutionizing Enterprise Workflow in 2026

Artificial Intelligence has evolved from passive text generation into **autonomous action engines**. Today, forward-thinking enterprises deploy AI agents that can query databases, call APIs, format reports, and communicate directly with customers.

## What is an Autonomous AI Agent?
Unlike traditional rule-based chatbots, an AI agent is empowered with tools and decision-making capabilities. It accepts a high-level goal (e.g. "Onboard new enterprise client Acme Corp") and breaks it down into executable steps.

## Key Business Benefits
1. **24/7 Execution**: Operations continue seamlessly across time zones without delay.
2. **Error Elimination**: Automated workflow pipelines eliminate manual data entry mistakes.
3. **Massive Scalability**: Handle 10x volume increases without linear headcount costs.

## How Hyktec Integrates AI into Your Business
At HYKTEC, we design custom AI solutions tailored to your proprietary data structures. Contact our team to explore how AI automation can elevate your business.
        `,
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        seoTitle: 'Autonomous AI Agents in 2026 | Hyktec Tech Insights',
        seoDescription: 'Learn how AI agents automate business processes, integrate systems, and drive enterprise growth in 2026.',
      },
      {
        title: 'Native vs Cross-Platform App Development: Making the Right Strategic Choice',
        slug: 'native-vs-cross-platform-app-development-strategy',
        category: 'App Development',
        author: 'Hyktec Mobile Architect',
        excerpt: 'Comparing Flutter, React Native, Kotlin, and Swift. Learn how to choose the optimal architecture for your app budget and timeline.',
        content: `
# Native vs Cross-Platform App Development: Making the Right Strategic Choice

When launching a new mobile product, one of the most critical decisions is selecting the right development framework.

## Cross-Platform (Flutter & React Native)
- **Single Codebase**: Build for iOS and Android simultaneously.
- **Faster Time to Market**: Cut initial development schedules by up to 40%.
- **Cost Efficient**: Ideal for MVPs, startups, and mid-sized enterprise products.

## Native Development (Kotlin & Swift)
- **Maximum Performance**: Essential for high-graphics games, heavy hardware access, or complex Bluetooth integrations.
- **Platform-Specific UX**: Delivers 100% native platform feel.

## Conclusion
For 90% of business applications, modern cross-platform frameworks deliver near-native performance at half the maintenance cost.
        `,
        featuredImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
        seoTitle: 'Native vs Cross-Platform Mobile Development Guide | Hyktec',
        seoDescription: 'Complete technical breakdown comparing Flutter, React Native, Swift, and Kotlin for business applications.',
      },
    ],
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
