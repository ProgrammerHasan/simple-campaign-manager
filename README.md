# Simple Campaign Manager
### Alhamdulillah! This is a minimal yet fully functional email campaign manager built with *Laravel*, *React*, *InertiaJS*, and *shadcn/ui*.  
### It allows you to manage contacts, create campaigns, and track per-recipient delivery status in a clean, organized, and scalable way.
````markdown
## Features

- Pre-seeded contacts (name + email)
- Contacts table with selection: single, multiple, or select all
- Create Campaigns: enter subject & body, select recipients
- Queue-based sending (simulated) per recipient
- Track per-recipient status: `pending`, `sent`, `failed`
- Campaign history & per-campaign delivery results
- Clean architecture: Actions, Services, Queued Jobs
- React components organized by page & reusable presentational components
- Accessible, Material-style UI using *shadcn/ui*

---

## Architecture Choices

- Separation of concerns
  Controllers remain thin; `CreateCampaignAction` handles creation, `CampaignService` handles sending.

- Pivot table
  `campaign_recipients` stores delivery status and metadata (`failed_reason`, `sent_at`) for each recipient, making reporting simple.

- Queued Jobs 
  Each recipient is handled via a queued job (`SendCampaignEmailJob`), enabling retries and scaling. In this demo, sending is simulated safely.

- Inertia + React 
  Provides server-side routing with modern React components. Pages are in `pages/`, reusable components in `components/`.

- UI  
  *shadcn/ui + TailwindCSS* for accessible, consistent, and composable UI. Modern and clean design with Material style.

- Validation 
  Laravel FormRequest ensures request data integrity before executing actions.
````
## Setup Instructions (Local)
### 1. Clone Repository

```bash
git clone git@github.com:ProgrammerHasan/simple-campaign-manager.git
cd simple-campaign-manager
```

### 2. Install Backend Dependencies

```bash
composer install
cp .env.example .env
# configure DB credentials in .env
php artisan key:generate
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Run Migrations & Seed Contacts

```bash
php artisan migrate
php artisan db:seed --class=ContactSeeder
```

### 5. Configure Queue (for simulated sending)

```bash
# .env
QUEUE_CONNECTION=database
```

### 6. Run Worker (in a separate terminal)

```bash
php artisan queue:work
```

> For quick development, set `QUEUE_CONNECTION=sync` (jobs run immediately without queue).

### 7. Run Dev Servers

```bash
# All-in-one (recommended)
composer run dev

# Or separately:

# Backend
php artisan serve

# Frontend
npm run dev
````
> This makes it clear that `composer run dev` can start both backend and frontend simultaneously.

### 8. Access the App

Open [http://127.0.0.1:8000](http://127.0.0.1:8000)

---
> Alhamdulillah, the application is now running. May it be beneficial and easy to use, Insha’Allah.

If you face any issues or need assistance, feel free to contact me on WhatsApp: [+8801625568604](https://wa.me/8801625568604?text=I%20am%20facing%20an%20issue%20with%20the%20Simple%20Campaign%20Manager%20project)

May Allah make this project beneficial for all, Insha’Allah.
