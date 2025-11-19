import React from 'react';

export const helpContent: { [key: string]: { [key: string]: string | React.ReactNode } | string } = {
  // Section-level help
  context_section: 'Define the "who, what, and why" of your research. This sets the stage for the AI, telling it which expert "hats" to wear and what the ultimate goal is.',
  coreQuestion_section: 'This is the heart of your prompt. A clear, specific question and hypothesis will yield a much more focused and insightful analysis.',
  specifications_section: 'Narrow the scope. Define the boundaries of your research, such as the timeframe, market sectors, and analytical methods to use.',
  output_section: 'Tell the AI exactly what you want the final report to look like. The more specific you are here, the less editing you\'ll have to do later.',
  risk_assessment_section: 'Explore the potential downsides. Prompting the AI to think about risks and extreme scenarios can uncover weaknesses you might have missed.',
  asset_sourcing_section: 'Provide specific identifiers for the asset. This helps the AI pinpoint the exact project and its data sources, reducing ambiguity.',
  quality_guardrails_section: 'Set the rules for data quality. "Strict" is best for high-stakes analysis, demanding fresh, verifiable data. "Loose" is for general research where directional accuracy is sufficient.',

  // Field-level help
  context: {
    experts: "Select the roles involved. This primes the AI to adopt the mindset and priorities of these experts, influencing the tone and focus of its analysis (e.g., a Security Auditor will focus on risks).",
    project: "The full, official name of the cryptocurrency project or protocol (e.g., 'Ethereum', 'Solana').",
    ticker: "The official ticker symbol for the project's primary token (e.g., 'ETH', 'SOL').",
    chain: "The main blockchain the project operates on. For L2s, this would be their parent chain (e.g., for Arbitrum, this is 'Ethereum Mainnet').",
    purpose: "What is the end product of this research? This helps the AI tailor the output's structure and depth for the intended audience.",
    priorKnowledge: "Briefly state what you already know. This prevents the AI from telling you things you already know and helps it focus on filling in the gaps.",
    gaps: "What specific uncertainties are you trying to resolve? This is a great place to list open questions or areas where public information is lacking.",
    actionability: "How will the findings be used? 'Theoretical' is for understanding, 'Strategic' for long-term planning, and 'Practical' for immediate decisions.",
  },
  coreQuestion: {
    primaryQuestion: "This is the single most important field. State your core question as clearly and specifically as possible. E.g., 'Is the current valuation of XYZ token justified based on its on-chain activity and upcoming roadmap?'",
    hypothesis: "What do you believe the answer to your primary question is? Stating a hypothesis allows the AI to structure its analysis to either validate or challenge your assumption.",
    counterfactuals: "Consider alternative viewpoints or scenarios. Forcing the AI to argue both the bull and bear case often leads to a more balanced and robust analysis.",
  },
  specifications: {
    timePeriod: "Define the timeframe for historical data analysis (e.g., 'Last 180 days', 'Since Jan 1, 2023').",
    geographicLocation: "Specify if your analysis should focus on particular regions, especially relevant for regulatory or adoption analysis (e.g., 'North America & EU', 'APAC').",
    sectorFocus: "Select the primary market categories the project belongs to. This helps the AI draw comparisons with the correct set of competitors.",
    demographicFocus: "Who are the target users? This influences which metrics are most important (e.g., for 'Institutional', metrics like liquidity depth are critical).",
    methodology: "Which analytical frameworks should the AI prioritize? Combining 'Fundamental' and 'On-chain' is a powerful combo for a holistic view.",
    ethics: "Are there any ethical or reputational concerns to consider? E.g., 'Impact on decentralization', 'Potential for wash trading', 'Founder anonymity'.",
  },
  output: {
    structure: "Select the building blocks of your final report. 'Executive Summary' and 'TLDR' are great for quick takeaways, while 'Deep Dive' sections provide granularity.",
    format: "Choose the output format. 'Markdown' is versatile, while 'JSON' is ideal if you plan to use the data programmatically.",
    tone: "How should the analysis be written? 'Formal' is suitable for official reports, while 'Neutral' is best for unbiased research.",
    length: "Give the AI a target word count to control the depth of the report. E.g., '~1000 words'.",
    visuals: "Request specific types of data visualizations. The AI can generate markdown-compatible tables or describe charts that should be created.",
  },
  risk_assessment: {
    key_risks: "Select known risk categories to ensure they are explicitly addressed in the analysis.",
    stress_scenarios: "Describe specific, extreme-but-plausible negative events. This tests the project's resilience. E.g., 'What happens if the protocol's main stablecoin de-pegs?'",
    black_swans: "Think about low-probability, high-impact events that are difficult to predict. This prompts the AI to think more creatively about tail risks.",
  },
  asset_sourcing: {
    coingecko_id: "The unique ID from the CoinGecko URL (e.g., 'ethereum'). This is a highly reliable way to identify an asset.",
    coinmarketcap_id: "The unique ID from the CoinMarketCap URL (e.g., 'ethereum'). Provides another strong identifier.",
    defillama_slug: "The unique ID from the DeFiLlama URL (e.g., 'ethereum'). Crucial for DeFi-related metrics.",
    contracts: "Provide key smart contract addresses, prefixed with their chain (e.g., 'ethereum:0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'). This is vital for deep on-chain analysis.",
    price_sources: "List preferred exchanges or oracles for price data to guide the AI's data sourcing.",
    supply_sources: "List trusted sources for token supply information (e.g., 'Official API', 'Dune Analytics dashboard').",
    onchain_sources: "Specify platforms for on-chain data, like block explorers or analytics platforms.",
    social_sources: "Indicate where to look for sentiment and community discussion (e.g., 'X/Twitter', 'Project's Discord').",
  },
  quality_guardrails: {
    guardrail_preset: "'Strict' is best for financial decisions, demanding multiple, fresh data sources. 'Loose' is for quicker, general research. 'Custom' lets you define every parameter.",
    price_freshness: "Maximum acceptable age of price data, in seconds. Lower is better for volatile markets.",
    supply_freshness: "Maximum acceptable age of circulating supply data. This changes less frequently than price.",
    volume_freshness: "Maximum acceptable age of trading volume data.",
    onchain_freshness: "Maximum acceptable age for on-chain metrics like transaction counts or active addresses.",
    social_freshness: "Maximum acceptable age for social media sentiment data.",
    dev_freshness: "Maximum acceptable age for developer activity data (e.g., Github commits).",
    min_sources: "The minimum number of independent sources required to corroborate a critical data point (like price). '3' is a robust choice.",
    consensus_method: "'Median' is generally preferred over 'Mean' as it is less susceptible to extreme outliers from a single faulty source.",
    price_deviation: "The maximum allowed percentage difference between sources for a price point (e.g., 0.01 for 1%). If exceeded, the data is considered unreliable.",
    supply_deviation: "The maximum allowed percentage difference between sources for supply data.",
    volume_deviation: "The maximum allowed percentage difference between sources for volume data.",
    outlier_rule: "The statistical method used to identify and discard outlier data points from sources before calculating the consensus value.",
  },
};
