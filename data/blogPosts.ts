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
import post_implementing_model_context_protocol_for_secure_agent from './posts/implementing-model-context-protocol-for-secure-agent';
import post_build_agentic_native_apis_beyond_static_endpoints from './posts/build-agentic-native-apis-beyond-static-endpoints';
import post_vite_replaces_cra_react_migration_guide_2025 from './posts/vite-replaces-cra-react-migration-guide-2025';
import post_agentic_ci_pipelines_autonomous_code_review_testing from './posts/agentic-ci-pipelines-autonomous-code-review-testing';
import post_replace_wordpress_nextjs_secure_static_site from './posts/replace-wordpress-nextjs-secure-static-site';
import post_rust_wasm_nextjs_2026_compilation_strategies from './posts/rust-wasm-nextjs-2026-compilation-strategies';
import post_rust_headless_wordpress_api_architecture from './posts/rust-headless-wordpress-api-architecture';
import post_salesforce_flow_losing_ground_python_agents from './posts/salesforce-flow-losing-ground-python-agents';
import post_react_typescript_vite_vitest_setup_guide_2026 from './posts/react-typescript-vite-vitest-setup-guide-2026';
import post_supercharging_react_startups_webpack_vite_esm_2026 from './posts/supercharging-react-startups-webpack-vite-esm-2026';
import post_nextjs_server_actions_rust_backend_performance from './posts/nextjs-server-actions-rust-backend-performance';
import post_ai_coding_tools_backend_logic_edge_cases from './posts/ai-coding-tools-backend-logic-edge-cases';
import post_building_local_voice_ai_pipelines_python from './posts/building-local-voice-ai-pipelines-python';
import post_benchmark_oxfmt_prettier_nextjs_monorepo_ci_builds from './posts/benchmark-oxfmt-prettier-nextjs-monorepo-ci-builds';
import post_python_voice_to_form_automations_field_techs from './posts/python-voice-to-form-automations-field-techs';
import post_orchestrating_multi_agent_sales_python from './posts/orchestrating-multi-agent-sales-python';
import post_automating_sales_tasks_python_ai_agents from './posts/automating-sales-tasks-python-ai-agents';
import post_nextpress_wordpress_killer_modern_stack_2026 from './posts/nextpress-wordpress-killer-modern-stack-2026';
import post_observability_agentic_workflows_debugging from './posts/observability-agentic-workflows-debugging';
import post_postgres_ai_vector_store_sql_over_newdbs from './posts/postgres-ai-vector-store-sql-over-newdbs';
import post_build_local_first_ai_agents_privacy_mobile_tutorial from './posts/build-local-first-ai-agents-privacy-mobile-tutorial';


// ── Master array (order = newest-first after getAllPosts()) ──
export const blogPosts: BlogPost[] = [
  post_build_local_first_ai_agents_privacy_mobile_tutorial,
  post_postgres_ai_vector_store_sql_over_newdbs,
  post_observability_agentic_workflows_debugging,
  post_nextpress_wordpress_killer_modern_stack_2026,
  post_automating_sales_tasks_python_ai_agents,
  post_orchestrating_multi_agent_sales_python,
  post_python_voice_to_form_automations_field_techs,
  post_benchmark_oxfmt_prettier_nextjs_monorepo_ci_builds,
  post_building_local_voice_ai_pipelines_python,
  post_ai_coding_tools_backend_logic_edge_cases,
  post_nextjs_server_actions_rust_backend_performance,
  post_supercharging_react_startups_webpack_vite_esm_2026,
  post_react_typescript_vite_vitest_setup_guide_2026,
  post_salesforce_flow_losing_ground_python_agents,
  post_rust_headless_wordpress_api_architecture,
  post_rust_wasm_nextjs_2026_compilation_strategies,
  post_replace_wordpress_nextjs_secure_static_site,
  post_agentic_ci_pipelines_autonomous_code_review_testing,
  post_vite_replaces_cra_react_migration_guide_2025,
  post_build_agentic_native_apis_beyond_static_endpoints,
  post_implementing_model_context_protocol_for_secure_agent,
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
  [...blogPosts].sort((a, b) =>
    a.date !== b.date ? (a.date < b.date ? 1 : -1) : a.slug.localeCompare(b.slug)
  );

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getAllCategories = (): string[] =>
  Array.from(new Set(blogPosts.map((p) => p.category))).sort();

export const getAllTags = (): string[] =>
  Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();

export const getPostsByCategory = (category: string): BlogPost[] =>
  getAllPosts().filter((p) => p.category === category);

export const getPostsByTag = (tag: string): BlogPost[] =>
  getAllPosts().filter((p) => p.tags.includes(tag));

export const getRelatedPosts = (post: BlogPost, count = 3): BlogPost[] =>
  getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length * 2 +
        (p.category === post.category ? 1 : 0),
    }))
    .filter((x) => x.score >= 2) // must share at least 1 tag
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.post);
