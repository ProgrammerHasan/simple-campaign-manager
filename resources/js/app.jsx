import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Simple Campaign Management System';
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});


InertiaProgress.init();
