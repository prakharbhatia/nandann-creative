// ============================================================
// data/blogPosts.ts  –  AUTO-GENERATED index (do not edit)
// Add/edit posts in data/posts/<slug>.ts instead.
// ============================================================

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  lastUpdated?: string; // ISO - for dateModified tracking
  readTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  contentHtml: string; // pre-rendered HTML string
  faqs?: { question: string; answer: string }[];
  howTo?: {
    name: string;
    description?: string;
    steps: { name: string; text: string }[];
  };
};

// ── Individual post imports ──────────────────────────────────
import post_getting_started_with_rust_web_developers from './posts/getting-started-with-rust-web-developers';
import post_ai_coding_assistants_cant_read_code from './posts/ai-coding-assistants-cant-read-code';
import post_salesforce_flow_vs_apex_2026 from './posts/salesforce-flow-vs-apex-2026';
import post_rust_wasm_production_2026 from './posts/rust-wasm-production-2026';
import post_python_free_threading_2026 from './posts/python-free-threading-2026';
import post_wordpress_losing_customers_nextjs_blog_post from './posts/wordpress-losing-customers-nextjs-blog-post';
import post_typescript_vs_deno_vs_bun_2026_performance_comparison from './posts/typescript-vs-deno-vs-bun-2026-performance-comparison';
import post_axios_npm_backdoored_supply_chain_attack from './posts/axios-npm-backdoored-supply-chain-attack';
import post_voice_ai_agentic_ai_customer_support_guide from './posts/voice-ai-agentic-ai-customer-support-guide';
import post_typescript_6_0_release_features_go_compiler_7_0 from './posts/typescript-6-0-release-features-go-compiler-7-0';
import post_nextjs_16_2_complete_guide from './posts/nextjs-16-2-complete-guide';
import post_rust_aws_lambda_production_guide from './posts/rust-aws-lambda-production-guide';
import post_rust_pyo3_python_extensions_guide from './posts/rust-pyo3-python-extensions-guide';
import post_wordpress_7_developer_guide from './posts/wordpress-7-developer-guide';
import post_rewriting_in_rust_when_it_makes_sense from './posts/rewriting-in-rust-when-it-makes-sense';
import post_tanstack_ai_switzerland_of_ai_tooling from './posts/tanstack-ai-switzerland-of-ai-tooling';
import post_nextjs_16_release_comprehensive_guide from './posts/nextjs-16-release-comprehensive-guide';
import post_php_8_5_launch_major_updates from './posts/php-8-5-launch-major-updates';
import post_ace_core_web_vitals_2025_inp_requirements from './posts/ace-core-web-vitals-2025-inp-requirements';
import post_get_ready_2025_holiday_sales_traffic from './posts/get-ready-2025-holiday-sales-traffic';
import post_apple_iphone_17_ios_26_event_2025 from './posts/apple-iphone-17-ios-26-event-2025';
import post_high_performance_websites_business_case from './posts/high-performance-websites-business-case';
import post_ai_powered_website_fixes_local_businesses from './posts/ai-powered-website-fixes-local-businesses';
import post_ai_seo_optimizing_for_ai_recommendations from './posts/ai-seo-optimizing-for-ai-recommendations';
import post_gpt5_review_raising_the_floor from './posts/gpt5-review-raising-the-floor';
import post_python_hosting_options_comparison from './posts/python-hosting-options-comparison';
import post_nextjs_hosting_options_comparison from './posts/nextjs-hosting-options-comparison';
import post_ai_web_development_2025 from './posts/ai-web-development-2025';
import post_same_day_website_delivery from './posts/same-day-website-delivery';
import post_web_performance_optimization_guide from './posts/web-performance-optimization-guide';
import post_react_vs_nextjs_which_to_choose from './posts/react-vs-nextjs-which-to-choose';
import post_website_security_essentials from './posts/website-security-essentials';
import post_mobile_first_design_principles from './posts/mobile-first-design-principles';
import post_seo_for_web_developers from './posts/seo-for-web-developers';
import post_ecommerce_development_best_practices from './posts/ecommerce-development-best-practices';
import post_struggling_with_scalability_accelerate_time_to_market_nextjs from './posts/struggling-with-scalability-accelerate-time-to-market-nextjs';
import post_securing_wordpress_rust_webassembly_plugins from './posts/securing-wordpress-rust-webassembly-plugins';
import post_replacing_wordpress_plugins_rust_webassembly from './posts/replacing-wordpress-plugins-rust-webassembly';
import post_build_autonomous_sales_voice_agents_salesforce from './posts/build-autonomous-sales-voice-agents-salesforce';
import post_mastering_agentic_workflows_python_2026 from './posts/mastering-agentic-workflows-python-2026';
import post_web_dev_chaos_2026_wordpress_nextjs_rust from './posts/web-dev-chaos-2026-wordpress-nextjs-rust';


// ── Master array (order = newest-first after getAllPosts()) ──
export const blogPosts: BlogPost[] = [
  post_web_dev_chaos_2026_wordpress_nextjs_rust,
  post_mastering_agentic_workflows_python_2026,
  post_build_autonomous_sales_voice_agents_salesforce,
  post_replacing_wordpress_plugins_rust_webassembly,
  post_securing_wordpress_rust_webassembly_plugins,

  post_getting_started_with_rust_web_developers,
  post_ai_coding_assistants_cant_read_code,
  post_salesforce_flow_vs_apex_2026,
  post_rust_wasm_production_2026,
  post_python_free_threading_2026,
  post_wordpress_losing_customers_nextjs_blog_post,
  post_typescript_vs_deno_vs_bun_2026_performance_comparison,
  post_axios_npm_backdoored_supply_chain_attack,
  post_voice_ai_agentic_ai_customer_support_guide,
  post_typescript_6_0_release_features_go_compiler_7_0,
  post_nextjs_16_2_complete_guide,
  post_rust_aws_lambda_production_guide,
  post_rust_pyo3_python_extensions_guide,
  post_wordpress_7_developer_guide,
  post_rewriting_in_rust_when_it_makes_sense,
  post_tanstack_ai_switzerland_of_ai_tooling,
  post_nextjs_16_release_comprehensive_guide,
  post_php_8_5_launch_major_updates,
  post_ace_core_web_vitals_2025_inp_requirements,
  post_get_ready_2025_holiday_sales_traffic,
  post_apple_iphone_17_ios_26_event_2025,
  post_high_performance_websites_business_case,
  post_ai_powered_website_fixes_local_businesses,
  post_ai_seo_optimizing_for_ai_recommendations,
  post_gpt5_review_raising_the_floor,
  post_python_hosting_options_comparison,
  post_nextjs_hosting_options_comparison,
  post_ai_web_development_2025,
  post_same_day_website_delivery,
  post_web_performance_optimization_guide,
  post_react_vs_nextjs_which_to_choose,
  post_website_security_essentials,
  post_mobile_first_design_principles,
  post_seo_for_web_developers,
  post_ecommerce_development_best_practices,
  post_struggling_with_scalability_accelerate_time_to_market_nextjs,
];

export const getAllPosts = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
