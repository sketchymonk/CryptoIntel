import { FormData, ResearchTemplate } from './types';

export const templates: ResearchTemplate[] = [
  {
    id: 'investment-thesis',
    name: 'Investment Thesis Generation',
    description: 'A template for conducting deep-dive fundamental analysis to form a clear bull vs. bear investment thesis.',
    data: {
      context: {
        experts: ['Lead Tokenomics Analyst', 'Macro Strategist'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'What is the long-term (3-5 year) value proposition and risk-adjusted return potential of this project?',
        hypothesis: 'The project has a sustainable competitive advantage through its technology and community, which will lead to significant value accrual in its native token.',
        counterfactuals: 'Bull Case: Achieves top 10 market cap. Bear Case: Fails to gain adoption and is outcompeted by rivals.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'On-chain Quant Analysis'],
      },
      output: {
        structure: [
          'executive_summary',
          'tokenomics_deep_dive',
          'competitive_landscape',
          'risk_assessment',
          'investment_thesis',
        ],
        format: 'markdown',
        tone: 'neutral',
        length: '2000-2500 words',
      },
      risk_assessment: {
        key_risks: ['market_risk', 'tech_risk', 'regulatory_risk', 'competitor_risk'],
        stress_scenarios: 'A major competitor launches a superior product, leading to a 50% drop in user activity. A key smart contract is exploited for >$10M.',
      },
    },
  },
  {
    id: 'tokenomics-audit',
    name: 'Tokenomics Audit',
    description: 'A focused template for rigorously auditing a project\'s tokenomics, including supply, distribution, and utility.',
    data: {
      context: {
        experts: ['Lead Tokenomics Analyst', 'On-Chain/Data Engineer'],
        purpose: 'Risk memo',
        actionability: 'Practical trading plan',
      },
      coreQuestion: {
        primaryQuestion: 'Does the project\'s tokenomics model create sustainable long-term value and align incentives for all stakeholders?',
      },
      specifications: {
        methodology: ['On-chain Quant Analysis', 'Fundamental Analysis'],
        sectorFocus: ['DeFi', 'Infrastructure'],
      },
      output: {
        structure: [
          'tldr_for_novices',
          'tokenomics_deep_dive',
          'onchain_metrics',
          'risk_assessment',
          'audit_log',
        ],
        format: 'json',
        tone: 'formal',
      },
      asset_sourcing: {
        price_sources: 'CoinGecko, Binance, Uniswap',
        supply_sources: 'Protocol API, CoinGecko, Dune Analytics',
        onchain_sources: 'Etherscan API, Flipside Crypto, Token Terminal',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
      },
    },
  },
  {
    id: 'security-audit',
    name: 'Security Audit & Vulnerability Assessment',
    description: 'A highly technical template for identifying potential security risks, smart contract vulnerabilities, and centralization vectors.',
    data: {
      context: {
        experts: ['Security Auditor', 'On-Chain/Data Engineer'],
        purpose: 'Risk memo',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'What are the primary security vulnerabilities, attack vectors, and centralization risks associated with the project\'s protocol and ecosystem?',
        hypothesis: 'The protocol may have undiscovered vulnerabilities in its smart contracts or economic design that could be exploited.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'On-chain Quant Analysis'],
      },
      output: {
        structure: [
          'risk_assessment',
          'team_background',
          'audit_log',
        ],
        format: 'markdown',
        tone: 'formal',
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'centralization_risk'],
        stress_scenarios: 'Scenario: Malicious actor exploits a reentrancy bug in the main lending pool. Scenario: Multisig holders collude to steal funds. Scenario: Oracle manipulation attack.',
        black_swans: 'A novel, unforeseen cryptographic vulnerability is discovered that affects the underlying blockchain.',
      },
      asset_sourcing: {
        contracts: 'Please list all relevant smart contract addresses for audit.',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
      },
    },
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Landscape Analysis',
    description: 'A strategic template to analyze a project\'s position relative to its key competitors, focusing on strengths, weaknesses, and market differentiation.',
    data: {
      context: {
        experts: ['Macro Strategist', 'Lead Tokenomics Analyst'],
        purpose: 'Pitch deck',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'How does this project differentiate itself from its main competitors, and what is its unique value proposition in the current market?',
        counterfactuals: 'What would happen if a major competitor integrated this project\'s key feature? How could the project defend its market share?',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'Sentiment Analysis'],
      },
      output: {
        structure: [
          'executive_summary',
          'competitive_landscape',
          'investment_thesis',
        ],
        format: 'slide_deck',
        tone: 'neutral',
        visuals: ['tables', 'charts'],
      },
      risk_assessment: {
        key_risks: ['competitor_risk', 'market_risk'],
      },
      quality_guardrails: {
        guardrail_preset: 'loose',
      },
    },
  },
  {
    id: 'defi-yield-farming',
    name: 'DeFi Yield Farming Strategy',
    description: 'A template for discovering and assessing yield farming opportunities, focusing on APY, risk, and sustainability.',
    data: {
      context: {
        experts: ['On-Chain/Data Engineer', 'Lead Tokenomics Analyst'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Practical trading plan',
      },
      coreQuestion: {
        primaryQuestion: 'What are the most attractive and sustainable yield farming opportunities for stablecoins and ETH, considering risk-adjusted returns?',
        hypothesis: 'Newer protocols may offer higher APYs but carry significantly higher smart contract and economic risks compared to established blue-chip DeFi protocols.',
      },
      specifications: {
        methodology: ['On-chain Quant Analysis', 'Fundamental Analysis'],
        sectorFocus: ['DeFi'],
      },
      output: {
        structure: ['executive_summary', 'onchain_metrics', 'risk_assessment', 'investment_thesis'],
        format: 'markdown',
        tone: 'neutral',
        visuals: ['tables', 'charts'],
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'market_risk', 'centralization_risk'],
        stress_scenarios: 'Impermanent loss calculations under high volatility scenarios. Smart contract exploit draining the liquidity pool. Governance attack that alters pool parameters.',
      },
      asset_sourcing: {
        defillama_slug: 'Enter the DeFiLlama slug for the protocol (e.g., aave-v3)',
        contracts: 'List the specific pool/vault contract addresses for analysis.',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
      },
    },
  },
  {
    id: 'nft-market-analysis',
    name: 'NFT Collection Analysis',
    description: 'A template for evaluating an NFT collection\'s market health, community strength, and long-term potential.',
    data: {
      context: {
        experts: ['Macro Strategist', 'On-Chain/Data Engineer'],
        purpose: 'Inform trading/investment decision',
      },
      coreQuestion: {
        primaryQuestion: 'What is the current market sentiment, on-chain activity (holder distribution, sales volume), and future growth potential for this NFT collection?',
        counterfactuals: 'Bull Case: The collection becomes a blue-chip asset with lasting cultural significance. Bear Case: Hype fades, liquidity dries up, and the floor price collapses.',
      },
      specifications: {
        methodology: ['On-chain Quant Analysis', 'Sentiment Analysis'],
        demographicFocus: ['Retail'],
      },
      output: {
        structure: ['tldr_for_novices', 'onchain_metrics', 'competitive_landscape', 'risk_assessment', 'team_background'],
        format: 'markdown',
        tone: 'neutral',
        visuals: ['charts', 'tables'],
      },
      risk_assessment: {
        key_risks: ['market_risk', 'tech_risk'],
        stress_scenarios: 'A large, influential holder liquidates their entire position, crashing the floor price. The project founders abandon the project (rug pull).',
      },
      asset_sourcing: {
        contracts: 'The main NFT contract address (e.g., ethereum:0x...).',
        onchain_sources: 'OpenSea API, Blur API, NFTScan, Dune',
        social_sources: 'X/Twitter, Discord',
      },
      quality_guardrails: {
        guardrail_preset: 'loose',
      },
    },
  },
  {
    id: 'regulatory-risk-assessment',
    name: 'Regulatory Compliance Assessment',
    description: 'A template to assess a project\'s potential regulatory risks across key jurisdictions, focusing on token classification and operational compliance.',
    data: {
      context: {
        experts: ['Regulatory Counsel', 'Macro Strategist'],
        purpose: 'Risk memo',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'What are the primary regulatory risks facing this project in the USA and EU, particularly regarding its token classification (e.g., security, commodity, utility) and AML/KYC obligations?',
      },
      specifications: {
        geographicLocation: 'USA, European Union, United Kingdom',
        methodology: ['Fundamental Analysis', 'Event-Driven Analysis'],
      },
      output: {
        structure: ['executive_summary', 'risk_assessment', 'team_background'],
        format: 'pdf_structure',
        tone: 'formal',
      },
      risk_assessment: {
        key_risks: ['regulatory_risk', 'centralization_risk'],
        stress_scenarios: 'The project\'s token is explicitly named and classified as a security by the SEC. A major country where the founding team operates bans decentralized exchanges. The project\'s DAO is classified as a general partnership, making token holders liable.',
      },
      quality_guardrails: {
        guardrail_preset: 'loose',
      },
    },
  },
  {
    id: 'legitimacy-screen',
    name: 'Project Legitimacy & Rug Pull Screen',
    description: 'A checklist-driven template to assess a project\'s legitimacy, operational history, and identify common red flags associated with scams or "rug pulls".',
    data: {
      context: {
        experts: ['Security Auditor', 'On-Chain/Data Engineer'],
        purpose: 'Risk memo',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'Assess the overall legitimacy of this project. Based on on-chain data, developer activity, and public presence, identify any red flags that could indicate a high risk of a "rug pull" or abandonment.',
        hypothesis: 'The project may exhibit several common red flags, such as anonymous founders, low developer activity, or a highly centralized token distribution, indicating a high risk profile.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'On-chain Quant Analysis', 'Sentiment Analysis'],
      },
      output: {
        structure: ['executive_summary', 'team_background', 'onchain_metrics', 'risk_assessment'],
        format: 'markdown',
        tone: 'formal',
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'centralization_risk'],
        stress_scenarios: 'Founders delete all social media and the project website goes offline. A single wallet holding >20% of the supply begins to sell off tokens. The majority of the liquidity pool is unlocked and removed.',
      },
      asset_sourcing: {
        onchain_sources: 'Block explorer (e.g., Etherscan), DEXTools, Bubblemaps',
        social_sources: 'X/Twitter, Telegram, Discord, Website, GitHub',
      },
      quality_guardrails: {
        guardrail_preset: 'loose',
      },
    },
  },
  {
    id: 'alpha-synthesis',
    name: 'Alpha Synthesis: All-in-One Thesis',
    description: 'A comprehensive template combining all expert perspectives (Tokenomics, On-chain, Macro, Security, Regulatory) into a single, actionable investment thesis.',
    data: {
      context: {
        experts: ['Lead Tokenomics Analyst', 'On-Chain/Data Engineer', 'Macro Strategist', 'Security Auditor', 'Regulatory Counsel'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Practical trading plan',
      },
      coreQuestion: {
        primaryQuestion: 'By synthesizing insights from all expert domains (tokenomics, on-chain, macro, security, regulatory), what is the most robust and actionable investment thesis for this project for the next 6-12 months?',
        counterfactuals: 'What is the single biggest blind spot that could invalidate this synthesized thesis? Which expert\'s domain poses the greatest risk to the bull case?',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'On-chain Quant Analysis', 'Event-Driven Analysis', 'Sentiment Analysis'],
      },
      output: {
        structure: ['executive_summary', 'investment_thesis', 'risk_assessment', 'price_prediction', 'audit_log'],
        format: 'markdown',
        tone: 'opinionated',
        length: '~1000 words',
      },
      risk_assessment: {
        key_risks: ['market_risk', 'tech_risk', 'regulatory_risk', 'centralization_risk', 'competitor_risk'],
        black_swans: 'A coordinated, multi-faceted attack combining a technical exploit with a regulatory complaint and a social media FUD campaign.',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
      },
    },
  },
];