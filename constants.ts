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
        options: [
            { value: 'Lead Tokenomics Analyst', label: 'Lead Tokenomics Analyst' },
            { value: 'On-Chain/Data Engineer', label: 'On-Chain/Data Engineer' },
            { value: 'Macro Strategist', label: 'Macro Strategist' },
            { value: 'Security Auditor', label: 'Security Auditor' },
            { value: 'Regulatory Counsel', label: 'Regulatory Counsel' },
        ]
      },
      { id: 'project', label: 'Coin/Project Name', type: 'text', placeholder: 'e.g., Ethereum' },
      { id: 'ticker', label: 'Ticker Symbol', type: 'text', placeholder: 'e.g., ETH' },
      { id: 'chain', label: 'Primary Chain', type: 'text', placeholder: 'e.g., Ethereum Mainnet' },
      {
        id: 'purpose',
        label: 'My purpose is to',
        type: 'select',
        options: [
            { value: 'Inform trading/investment decision', label: 'Inform trading/investment decision' },
            { value: 'Long-form report', label: 'Long-form report' },
            { value: 'Pitch deck', label: 'Pitch deck' },
            { value: 'Risk memo', label: 'Risk memo' },
        ]
      },
      { id: 'priorKnowledge', label: 'I already know (briefly)', type: 'textarea', placeholder: 'Your prior knowledge/assumptions' },
      { id: 'gaps', label: 'Potential Gaps in Existing Research', type: 'textarea', placeholder: 'e.g., unclear token unlock effects' },
      {
        id: 'actionability',
        label: 'Actionability of Findings',
        type: 'select',
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
      { id: 'primaryQuestion', label: 'Primary Question', type: 'textarea', placeholder: 'e.g., What is the risk-adjusted return potential over 1-5 years?' },
      { id: 'hypothesis', label: 'Hypothesis or Expected Insights', type: 'textarea', placeholder: 'What you expect to learn or validate' },
      { id: 'counterfactuals', label: 'Counterfactuals & Alternative Perspectives', type: 'textarea', placeholder: 'e.g., Bull vs. Bear on adoption rates' },
    ],
  },
  {
    id: 'specifications',
    title: '3. Specifications & Parameters',
    fields: [
      { id: 'timePeriod', label: 'Time Period', type: 'text', placeholder: 'e.g., Last 12–24 months' },
      { id: 'geographicLocation', label: 'Geographic Location', type: 'text', placeholder: 'Global / Specific regions' },
      {
        id: 'sectorFocus',
        label: 'Industry/Sector Focus',
        type: 'checkbox',
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
        options: [
            { value: 'Fundamental Analysis', label: 'Fundamental Analysis' },
            { value: 'On-chain Quant Analysis', label: 'On-chain Quant Analysis' },
            { value: 'Technical/Chart Analysis', label: 'Technical/Chart Analysis' },
            { value: 'Sentiment Analysis', label: 'Sentiment Analysis' },
            { value: 'Event-Driven Analysis', label: 'Event-Driven Analysis' },
            { value: 'Predictive Modeling', label: 'Predictive Modeling' },
        ]
      },
      { id: 'ethics', label: 'Ethical Considerations', type: 'textarea', placeholder: 'Market manipulation concerns...' },
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
          options: [
            { value: 'executive_summary', label: 'Executive Summary' },
            { value: 'tldr_for_novices', label: 'TLDR for Novices' },
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
          options: [
            { value: 'formal', label: 'Formal & Academic' },
            { value: 'neutral', label: 'Neutral & Objective' },
            { value: 'opinionated', label: 'Slightly Opinionated (with justifications)' },
          ]
        },
        { id: 'length', label: 'Desired Length', type: 'text', placeholder: 'e.g., ~1500 words' },
        {
          id: 'visuals',
          label: 'Required Visuals',
          type: 'checkbox',
          options: [
            { value: 'charts', label: 'Charts (e.g., price, volume)' },
            { value: 'tables', label: 'Tables (for comparative data)' },
            { value: 'diagrams', label: 'Diagrams (for token flows)' },
            { value: 'onchain_activity_charts', label: 'On-chain Activity Charts' },
            { value: 'competitor_comparison_graphs', label: 'Competitor Comparison Graphs' },
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
        options: [
          { value: 'market_risk', label: 'Market Risk (Volatility, Liquidity)' },
          { value: 'tech_risk', label: 'Technology Risk (Bugs, Exploits)' },
          { value: 'regulatory_risk', label: 'Regulatory Risk' },
          { value: 'centralization_risk', label: 'Centralization Risk' },
          { value: 'competitor_risk', label: 'Competitor Risk' },
        ]
      },
      { id: 'stress_scenarios', label: 'Stress Test Scenarios', type: 'textarea', placeholder: 'e.g., 51% attack, major exchange delisting, key developer departure' },
      { id: 'black_swans', label: 'Potential Black Swan Events', type: 'textarea', placeholder: 'Unforeseen high-impact events to consider' },
    ]
  },
  {
    id: 'asset_sourcing',
    title: '6. Asset Identification & Sources',
    fields: [
      { id: 'coingecko_id', label: 'CoinGecko ID', type: 'text', placeholder: 'e.g., ethereum' },
      { id: 'coinmarketcap_id', label: 'CoinMarketCap ID', type: 'text', placeholder: 'e.g., ethereum' },
      { id: 'defillama_slug', label: 'DeFiLlama Slug', type: 'text', placeholder: 'e.g., ethereum' },
      { id: 'contracts', label: 'Key Contract Addresses (chain:address)', type: 'textarea', placeholder: 'e.g., ethereum:0x123..., arbitrum:0x456...' },
      { id: 'price_sources', label: 'Preferred Price Sources', type: 'textarea', placeholder: 'e.g., Binance, Coinbase, Kraken' },
      { id: 'supply_sources', label: 'Preferred Supply Sources', type: 'textarea', placeholder: 'e.g., Protocol API, CoinGecko, Dune' },
      { id: 'onchain_sources', label: 'Preferred On-chain Sources', type: 'textarea', placeholder: 'e.g., Etherscan API, Subgraph, Flipside' },
      { id: 'social_sources', label: 'Preferred Social Sources', type: 'textarea', placeholder: 'e.g., X/Twitter API, Santiment, Reddit' },
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
        options: [
          { value: 'custom', label: 'Custom (configure below)' },
          { value: 'strict', label: 'Strict Defaults (Recommended)' },
          { value: 'loose', label: 'Web Scraping (Looser Guardrails)' },
        ]
      },
      { id: 'price_freshness', label: 'Max Price Age (seconds)', type: 'text', placeholder: 'e.g., 60' },
      { id: 'supply_freshness', label: 'Max Supply Age (seconds)', type: 'text', placeholder: 'e.g., 86400' },
      { id: 'volume_freshness', label: 'Max Volume Age (seconds)', type: 'text', placeholder: 'e.g., 3600' },
      { id: 'onchain_freshness', label: 'Max On-chain Data Age (seconds)', type: 'text', placeholder: 'e.g., 7200' },
      { id: 'social_freshness', label: 'Max Social Data Age (seconds)', type: 'text', placeholder: 'e.g., 7200' },
      { id: 'dev_freshness', label: 'Max Dev Activity Age (seconds)', type: 'text', placeholder: 'e.g., 86400' },
      { id: 'min_sources', label: 'Min. Consensus Sources', type: 'text', placeholder: 'e.g., 3' },
      {
        id: 'consensus_method',
        label: 'Consensus Method',
        type: 'select',
        options: [
          { value: '', label: 'Select Method' },
          { value: 'median', label: 'Median' },
          { value: 'mean', label: 'Mean' },
        ]
      },
      { id: 'price_deviation', label: 'Max Price Relative Deviation', type: 'text', placeholder: 'e.g., 0.01 (for 1%)' },
      { id: 'supply_deviation', label: 'Max Supply Relative Deviation', type: 'text', placeholder: 'e.g., 0.02' },
      { id: 'volume_deviation', label: 'Max Volume Relative Deviation', type: 'text', placeholder: 'e.g., 0.15' },
      {
        id: 'outlier_rule',
        label: 'Outlier Rule',
        type: 'select',
        options: [
          { value: '', label: 'Select Rule' },
          { value: 'MAD', label: 'Median Absolute Deviation (MAD)' },
          { value: 'IQR', label: 'Interquartile Range (IQR)' },
        ]
      },
    ]
  }
];