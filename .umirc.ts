import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "Login", layout: false, },
    { path: '/dashboard', component: 'Dashboard'},
    { path: '/analyze', component: 'Dashboard/Analyze'},
    { path: '/monitor', component: 'Dashboard/Monitor'},
    { path: '/workBench', component: 'Dashboard/WorkBench'},
    { path: '/ordersManagement', component: 'OrdersManagement'},
    { path: '/userManagement', component: 'UserManagement' },
    { path: '/userManagement1', component: 'UserManagement/UserManagement1' },
  ],
  npmClient: 'pnpm',
  alias: {
    '@': './src',
  },
  mock: {
    include: ['src/mock/**.js'],
  },
});
