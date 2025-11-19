
import { FormSection } from './types';

export const sections: FormSection[] = [
  {
    id: 'context',
    title: '1. Research Context & Goals',
    fields: [
      {
        id: 'experts',
        label: 'Expert(s) conducting the research',
        type: 'checkbox',
        description: 'Defines the persona and technical depth the AI should emulate for the analysis.',
        options: [
            { value: 'Lead Tokenomics Analyst', label: 'Lead Tokenomics Analyst' },
            { value: 'Senior Research & Investment Analyst', label: 'Senior Research & Investment Analyst' },
            { value: 'Protocol Architect', label: 'Protocol Architect (Technical)' },
            { value: 'DAO Governance Specialist', label: 'DAO Governance Specialist' },
            { value: 'On-Chain/Data Engineer', label: 'On-Chain/Data Engineer' },
            { value: 'Macro Strategist', label: 'Macro Strategist' },
            { value: 'Security Auditor', label: 'Security Auditor' },
            { value: 'Regulatory Counsel', label: 'Regulatory Counsel' },
        ]
      },
      { id: 'project', label: 'Coin/Project Name', type: 'text', placeholder: 'e.g., Ethereum', description: 'The specific subject of the research.' },
      { id: 'ticker', label: 'Ticker Symbol', type: 'text', placeholder: 'e.g., ETH', description: 'Used to accurately identify assets for price and chart data.' },
      { id: 'chain', label: 'Primary Chain', type: 'text', placeholder: 'e.g., Ethereum Mainnet', description: 'Critical for analyzing on-chain nuances (e.g., fees, security).' },
      {
        id: 'purpose',
        label: 'My purpose is to',
        type: 'select',
        description: 'Directs the AI to focus on specific outcomes: ROI (investment), comprehensive coverage (report), brevity (pitch), or safety (risk).',
        options: [
            { value: 'Inform trading/investment decision', label: 'Inform trading/investment decision' },
            { value: 'Long-form report', label: 'Long-form report' },
            { value: 'Pitch deck', label: 'Pitch deck' },
            { value: 'Risk memo', label: 'Risk memo' },
        ]
      },
      { id: 'priorKnowledge', label: 'I already know (briefly)', type: 'textarea', placeholder: 'Your prior knowledge/assumptions', description: 'Prevents the AI from explaining basics you already know, ensuring high-signal output.' },
      { id: 'gaps', label: 'Potential Gaps in Existing Research', type: 'textarea', placeholder: 'e.g., unclear token unlock effects', description: 'Focuses the research specifically on what is missing from your current understanding.' },
      {
        id: 'actionability',
        label: 'Actionability of Findings',
        type: 'select',
        description: 'Determines if the output should be a high-level concept, a strategic direction, or a specific execution plan.',
        options: [
            { value: 'Theoretical', label: 'Theoretical' },
            { value: 'Strategic', label: 'Strategic' },
            { value: 'Practical trading plan', label: 'Practical trading plan' },
        ]
      },
    ],
  },
  {
    id: 'coreQuestion',
    title: '2. Core Research Question & Hypothesis',
    fields: [
      { id: 'primaryQuestion', label: 'Primary Question', type: 'textarea', placeholder: 'e.g., What is the risk-adjusted return potential over 1-5 years?', description: 'The "North Star" of the research. Be specific to get the best results.' },
      { id: 'hypothesis', label: 'Hypothesis or Expected Insights', type: 'textarea', placeholder: 'What you expect to learn or validate', description: 'Allows the AI to attempt to prove or disprove a specific theory with data.' },
      { id: 'counterfactuals', label: 'Counterfactuals & Alternative Perspectives', type: 'textarea', placeholder: 'e.g., Bull vs. Bear on adoption rates', description: 'Forces consideration of alternative scenarios to reduce confirmation bias.' },
    ],
  },
  {
    id: 'specifications',
    title: '3. Specifications & Parameters',
    fields: [
      { id: 'timePeriod', label: 'Time Period', type: 'text', placeholder: 'e.g., Last 12–24 months', description: 'Sets the historical scope for data analysis (e.g., "since the Merge").' },
      { id: 'geographicLocation', label: 'Geographic Location', type: 'text', placeholder: 'Global / Specific regions', description: 'Relevant for analyzing regulatory jurisdiction or regional adoption.' },
      {
        id: 'sectorFocus',
        label: 'Industry/Sector Focus',
        type: 'checkbox',
        description: 'Contextualizes the project within its specific market vertical for comparative analysis.',
        options: [
            { value: 'L1', label: 'L1' },
            { value: 'L2', label: 'L2' },
            { value: 'DeFi', label: 'DeFi' },
            { value: 'RWA', label: 'RWA' },
            { value: 'AI', label: 'AI' },
            { value: 'Gaming', label: 'Gaming' },
            { value: 'Infrastructure', label: 'Infrastructure' },
            { value: 'Privacy', label: 'Privacy' },
        ]
      },
      {
        id: 'demographicFocus',
        label: 'Demographic Focus',
        type: 'checkbox',
        description: 'Identifies the target audience (e.g., retail vs. institutional) to assess product-market fit.',
        options: [
            { value: 'Retail', label: 'Retail' },
            { value: 'Institutional', label: 'Institutional' },
            { value: 'Developer cohorts', label: 'Developer cohorts' },
            { value: 'Geographies', label: 'Geographies' },
        ]
      },
      {
        id: 'methodology',
        label: 'Methodological Approach',
        type: 'checkbox',
        description: 'Instructs the AI on which analytical lenses (Fundamental, Technical, On-chain) to apply.',
        options: [
            { value: 'Fundamental Analysis', label: 'Fundamental Analysis' },
            { value: 'On-chain Quant Analysis', label: 'On-chain Quant Analysis' },
            { value: 'Technical/Chart Analysis', label: 'Technical/Chart Analysis' },
            { value: 'Sentiment Analysis', label: 'Sentiment Analysis' },
            { value: 'Event-Driven Analysis', label: 'Event-Driven Analysis' },
            { value: 'Predictive Modeling', label: 'Predictive Modeling' },
        ]
      },
      { id: 'ethics', label: 'Ethical Considerations', type: 'textarea', placeholder: 'Market manipulation concerns...', description: 'Ensures the analysis considers moral risks, centralization theater, or integrity issues.' },
      { id: 'marketTrends', label: 'Relevant Market Trends', type: 'textarea', placeholder: 'e.g., Growth in RWA, AI integration, regulatory shifts', description: 'Current or emerging trends that might impact the project\'s success.' },
    ],
  },
  {
    id: 'output',
    title: '4. Desired Report Output',
    fields: [
        {
          id: 'structure',
          label: 'Report Structure & Key Sections',
          type: 'checkbox',
          description: 'Select the specific components required in the final report artifact.',
          options: [
            { value: 'executive_summary', label: 'Executive Summary' },
            { value: 'tldr_for_novices', label: 'TLDR for Novices' },
            { value: 'news_analysis', label: 'News & Catalysts Analysis (Live)' },
            { value: 'tokenomics_deep_dive', label: 'Tokenomics Deep Dive' },
            { value: 'onchain_metrics', label: 'On-chain Metrics & Analysis' },
            { value: 'team_background', label: 'Team & Founder Background' },
            { value: 'competitive_landscape', label: 'Competitive Landscape' },
            { value: 'risk_assessment', label: 'Risk Assessment' },
            { value: 'investment_thesis', label: 'Investment Thesis (Bull vs. Bear)' },
            { value: 'price_prediction', label: 'Price Prediction / Valuation' },
            { value: 'audit_log', label: 'Full Data Provenance Audit Log' },
          ]
        },
        {
          id: 'format',
          label: 'Format',
          type: 'select',
          description: 'How the data should be presented for consumption (e.g., JSON for code, PDF for reading).',
          options: [
            { value: 'markdown', label: 'Markdown Report' },
            { value: 'json', label: 'JSON Data' },
            { value: 'summary', label: 'Bulleted Summary' },
            { value: 'slide_deck', label: 'Slide Deck (Markdown)' },
            { value: 'pdf_structure', label: 'Formal PDF Structure' },
          ]
        },
        {
          id: 'tone',
          label: 'Tone of Voice',
          type: 'select',
          description: 'Adjusts the language style to match the intended audience.',
          options: [
            { value: 'formal', label: 'Formal & Academic' },
            { value: 'neutral', label: 'Neutral & Objective' },
            { value: 'opinionated', label: 'Slightly Opinionated (with justifications)' },
          ]
        },
        { id: 'length', label: 'Desired Length', type: 'text', placeholder: 'e.g., ~1500 words', description: 'Target word count for the output.' },
        {
          id: 'visuals',
          label: 'Required Visuals',
          type: 'checkbox',
          description: 'Requests specific data visualizations to support the text.',
          options: [
            { value: 'charts', label: 'Charts (e.g., price, volume)' },
            { value: 'tables', label: 'Tables (for comparative data)' },
            { value: 'diagrams', label: 'Diagrams (for token flows)' },
          ]
        },
    ],
  },
  {
    id: 'risk_assessment',
    title: '5. Risk Assessment & Stress Testing',
    fields: [
      {
        id: 'key_risks',
        label: 'Key Risks to Investigate',
        type: 'checkbox',
        description: 'Select specific risk vectors to prioritize in the audit.',
        options: [
          { value: 'market_risk', label: 'Market Risk (Volatility, Liquidity)' },
          { value: 'tech_risk', label: 'Technology Risk (Bugs, Exploits)' },
          { value: 'regulatory_risk', label: 'Regulatory Risk' },
          { value: 'centralization_risk', label: 'Centralization Risk' },
          { value: 'competitor_risk', label: 'Competitor Risk' },
          { value: 'operational_risk', label: 'Operational Risk (e.g., team execution, hacks)' },
        ]
      },
      { id: 'stress_scenarios', label: 'Stress Test Scenarios', type: 'textarea', placeholder: 'e.g., 51% attack, major exchange delisting, key developer departure', description: 'Simulates extreme conditions to test the project\'s resilience.' },
      { id: 'black_swans', label: 'Potential Black Swan Events', type: 'textarea', placeholder: 'Unforeseen high-impact events to consider', description: 'Low probability, high impact events that could destroy value.' },
    ]
  },
  {
    id: 'asset_sourcing',
    title: '6. Asset Identification & Sources',
    fields: [
      { id: 'coingecko_id', label: 'CoinGecko ID', type: 'text', placeholder: 'e.g., ethereum', description: 'Ensures accurate data retrieval from CoinGecko.' },
      { id: 'coinmarketcap_id', label: 'CoinMarketCap ID', type: 'text', placeholder: 'e.g., ethereum', description: 'Ensures accurate data retrieval from CoinMarketCap.' },
      { id: 'defillama_slug', label: 'DeFiLlama Slug', type: 'text', placeholder: 'e.g., ethereum', description: 'Ensures accurate TVL and volume data retrieval.' },
      { id: 'contracts', label: 'Key Contract Addresses (chain:address)', type: 'textarea', placeholder: 'e.g., ethereum:0x123..., arbitrum:0x456...', description: 'Directs on-chain analysis to specific smart contracts.' },
      { id: 'price_sources', label: 'Preferred Price Sources', type: 'textarea', placeholder: 'e.g., Binance, Coinbase, Kraken', description: 'Trusted venues for price data to avoid wash trading noise.' },
      { id: 'supply_sources', label: 'Preferred Supply Sources', type: 'textarea', placeholder: 'e.g., Protocol API, CoinGecko, Dune', description: 'Trusted sources for circulating and total supply data.' },
      { id: 'onchain_sources', label: 'Preferred On-chain Sources', type: 'textarea', placeholder: 'e.g., Etherscan API, Subgraph, Flipside', description: 'Preferred block explorers or analytics platforms.' },
      { id: 'social_sources', label: 'Preferred Social Sources', type: 'textarea', placeholder: 'e.g., X/Twitter API, Santiment, Reddit', description: 'Preferred platforms for sentiment analysis.' },
    ]
  },
  {
    id: 'quality_guardrails',
    title: '7. Data Quality Guardrails',
    fields: [
      {
        id: 'guardrail_preset',
        label: 'Guardrail Preset',
        type: 'select',
        description: 'Quickly applies a standard set of data integrity and freshness rules.',
        options: [
          { value: 'custom', label: 'Custom (configure below)' },
          { value: 'strict', label: 'Strict Defaults (Recommended)' },
          { value: 'loose', label: 'Web Scraping (Looser Guardrails)' },
        ]
      },
      {
        id: 'include_provenance_table',
        label: 'Include Data Provenance Table',
        type: 'single_checkbox',
        description: 'Automatically adds a section listing all data sources, timestamps, and confidence scores.'
      },
      { id: 'price_freshness', label: 'Max Price Age', type: 'text', placeholder: 'e.g., 60s, 5m', description: 'Max age for price data. Supports s/m/h/d suffixes.' },
      { id: 'supply_freshness', label: 'Max Supply Age', type: 'text', placeholder: 'e.g., 24h, 1d', description: 'Max age for supply metrics. Supports s/m/h/d suffixes.' },
      { id: 'volume_freshness', label: 'Max Volume Age', type: 'text', placeholder: 'e.g., 1h', description: 'Max age for volume metrics. Supports s/m/h/d suffixes.' },
      { id: 'onchain_freshness', label: 'Max On-chain Data Age', type: 'text', placeholder: 'e.g., 2h', description: 'Max age for blockchain data. Supports s/m/h/d suffixes.' },
      { id: 'social_freshness', label: 'Max Social Data Age', type: 'text', placeholder: 'e.g., 2h', description: 'Max age for sentiment data. Supports s/m/h/d suffixes.' },
      { id: 'dev_freshness', label: 'Max Dev Activity Age', type: 'text', placeholder: 'e.g., 24h', description: 'Max age for github/commit data. Supports s/m/h/d suffixes.' },
      { id: 'min_sources', label: 'Min. Consensus Sources', type: 'text', placeholder: 'e.g., 3', description: 'Minimum number of independent sources required to validate a critical data point.' },
      {
        id: 'consensus_method',
        label: 'Consensus Method',
        type: 'select',
        description: 'The statistical method used to resolve discrepancies between multiple sources.',
        options: [
          { value: '', label: 'Select Method' },
          { value: 'median', label: 'Median' },
          { value: 'mean', label: 'Mean' },
        ]
      },
      { id: 'price_deviation', label: 'Max Price Relative Deviation', type: 'text', placeholder: 'e.g., 0.01 (for 1%)', description: 'Maximum allowed percentage difference between price sources.' },
      { id: 'supply_deviation', label: 'Max Supply Relative Deviation', type: 'text', placeholder: 'e.g., 0.02', description: 'Maximum allowed percentage difference between supply sources.' },
      { id: 'volume_deviation', label: 'Max Volume Relative Deviation', type: 'text', placeholder: 'e.g., 0.15', description: 'Maximum allowed percentage difference between volume sources.' },
      {
        id: 'outlier_rule',
        label: 'Outlier Rule',
        type: 'select',
        description: 'Statistical method for identifying and discarding outlier data points.',
        options: [
          { value: '', label: 'Select Rule' },
          { value: 'MAD', label: 'Median Absolute Deviation (MAD)' },
          { value: 'IQR', label: 'Interquartile Range (IQR)' },
        ]
      },
      {
        id: 'custom_validation_logic',
        label: 'Custom Validation Logic',
        type: 'textarea',
        placeholder: 'e.g., If volume < $500k, disregard price deviation alerts. If a source is stale > 3 times, blacklist it.',
        description: 'Define specific logic for data validation, outlier detection, or source selection that goes beyond standard numeric parameters.'
      }
    ]
  }
];
