
import { FormData, ResearchTemplate } from './types';

export const templates: ResearchTemplate[] = [
  {
    id: 'investment-thesis',
    name: 'Investment Thesis Generation',
    description: 'Institutional-grade investment memo designed for Portfolio Managers. Combines macro-economic context with deep fundamental analysis to articulate a clear Bull vs. Bear thesis. Best used for preparing Investment Committee proposals or high-conviction long-term allocation decisions.',
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
        visuals: ['tables'],
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
    description: 'Forensic analysis of supply dynamics and incentive structures. Identifies inflationary risks, predatory insider unlocks, and value capture mechanisms. Essential for determining if a token is structurally designed to accrue value to holders or merely enrich early investors/teams.',
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
        visuals: ['tables', 'diagrams'],
      },
      asset_sourcing: {
        price_sources: 'CoinGecko, Binance, Uniswap',
        supply_sources: 'Protocol API, CoinGecko, Dune Analytics',
        onchain_sources: 'Etherscan API, Flipside Crypto, Token Terminal',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
        include_provenance_table: true,
      },
    },
  },
  {
    id: 'new-listing-dd',
    name: 'New Listing Due Diligence',
    description: 'Rapid due diligence framework for TGEs and recent listings (0-6 months). Prioritizes initial float analysis, FDV ratios, and team background checks to filter vaporware from genuine gems before price discovery settles. Use this to avoid "rug pulls" and "VC dumps".',
    data: {
      context: {
        experts: ['Macro Strategist', 'Regulatory Counsel', 'Lead Tokenomics Analyst'],
        purpose: 'Pitch deck',
        actionability: 'Strategic',
        gaps: 'Verification of team background, locked liquidity status, and actual vs. marketing roadmap.',
      },
      coreQuestion: {
        primaryQuestion: 'Is this project a legitimate innovation with product-market fit, or a short-term hype vehicle? Evaluate initial float and unlock schedule impact.',
        hypothesis: 'The project is capitalizing on a current narrative trend but lacks technical depth.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'Sentiment Analysis', 'Social/News Analysis'],
        timePeriod: 'Launch to Present',
      },
      output: {
        structure: [
          'executive_summary',
          'team_background',
          'tokenomics_deep_dive',
          'competitive_landscape',
          'investment_thesis',
        ],
        format: 'summary',
        tone: 'opinionated',
        visuals: ['charts', 'tables'],
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'regulatory_risk', 'centralization_risk'],
        stress_scenarios: 'Team dumps tokens after lock-up expiry. Roadmap deliverables are delayed by >6 months.',
      },
      asset_sourcing: {
        social_sources: 'X/Twitter, Telegram, Discord, Reddit',
      }
    },
  },
  {
    id: 'protocol-security',
    name: 'Protocol Security & Risk Audit',
    description: 'Deep-dive technical risk assessment for DAO treasuries and large capital allocators. Scrutinizes smart contract dependencies, admin key centralization, and potential exploit vectors. Use this before depositing significant capital (>$100k) into any protocol.',
    data: {
      context: {
        experts: ['Security Auditor', 'On-Chain/Data Engineer'],
        purpose: 'Risk memo',
        actionability: 'Theoretical',
        priorKnowledge: 'Understanding of smart contract basics and common attack vectors (reentrancy, oracle manipulation).',
      },
      coreQuestion: {
        primaryQuestion: 'What are the catastrophic failure modes of this protocol, and how centralized are the admin controls?',
      },
      specifications: {
        methodology: ['On-chain Quant Analysis', 'Fundamental Analysis', 'Event-Driven Analysis'],
        ethics: 'Focus on user fund safety and decentralization theater.',
      },
      output: {
        structure: [
          'executive_summary',
          'risk_assessment',
          'onchain_metrics',
          'audit_log',
        ],
        format: 'pdf_structure',
        tone: 'formal',
        length: '~3000 words',
        visuals: ['tables'],
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'centralization_risk', 'market_risk'],
        stress_scenarios: 'Oracle failure leads to bad debt. Multi-sig signers collude. Infinite mint bug.',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
        include_provenance_table: true,
      },
    },
  },
  {
    id: 'narrative-swing',
    name: 'Narrative & Catalyst Swing Trade',
    description: 'Tactical framework for short-term (1-3 months) active trading. Identifies upcoming catalysts (mainnets, halvings, conferences) and sentiment shifts to capitalize on "Buy the Rumor" opportunities. Focuses on narrative velocity and timing rather than long-term fundamentals.',
    data: {
      context: {
        experts: ['Macro Strategist', 'Lead Tokenomics Analyst'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Practical trading plan',
      },
      coreQuestion: {
        primaryQuestion: 'What upcoming catalysts (next 1-3 months) will drive significant price action/repricing? Is the event priced in?',
        hypothesis: 'The upcoming mainnet launch/conference will drive a "buy the rumor" rally.',
      },
      specifications: {
        methodology: ['Event-Driven Analysis', 'Sentiment Analysis', 'Technical/Chart Analysis'],
        timePeriod: 'Next 3 months',
      },
      output: {
        structure: [
          'executive_summary',
          'investment_thesis',
          'price_prediction',
          'competitive_landscape',
        ],
        format: 'markdown',
        tone: 'opinionated',
        visuals: ['charts', 'tables'],
      },
      risk_assessment: {
        key_risks: ['market_risk', 'competitor_risk'],
        stress_scenarios: '"Sell the news" event triggers 30% correction. Delay in shipping feature.',
      },
      asset_sourcing: {
        social_sources: 'CryptoCalendar, X/Twitter, Galaxy Digital Reports',
      }
    },
  },
  {
    id: 'defi-deep-dive',
    name: 'DeFi Protocol Deep Dive',
    description: 'Granular breakdown of DeFi yield mechanics and revenue models. Separates "Real Yield" from inflationary emissions and analyzes flywheel sustainability. Critical for yield farmers and liquidity providers assessing the longevity of APRs and protocol solvency.',
    data: {
      context: {
        experts: ['Lead Tokenomics Analyst', 'On-Chain/Data Engineer', 'Security Auditor'],
        purpose: 'Long-form report',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'How sustainable are the protocol\'s yields and revenue models across different market cycles? Analyze the flywheel effect.',
        hypothesis: 'The protocol generates real revenue that accrues to token holders, creating a sustainable floor price.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'On-chain Quant Analysis', 'Technical/Chart Analysis'],
        sectorFocus: ['DeFi'],
        timePeriod: 'Inception to Present',
      },
      output: {
        structure: [
          'executive_summary',
          'tokenomics_deep_dive',
          'onchain_metrics',
          'risk_assessment',
          'competitive_landscape',
        ],
        format: 'markdown',
        tone: 'neutral',
        visuals: ['charts', 'diagrams', 'tables'],
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'market_risk', 'centralization_risk'],
        stress_scenarios: 'TVL drops by 70% in a week. Stablecoin depeg event affecting collateral.',
      },
      asset_sourcing: {
        defillama_slug: 'required', 
        onchain_sources: 'Dune Analytics, DefiLlama, Token Terminal',
      }
    },
  },
  {
    id: 'emerging-tech-trend',
    name: 'Emerging Tech Trend Analysis',
    description: 'Venture-style analysis for cutting-edge sectors (AI, RWA, DePIN). Evaluates Total Addressable Market (TAM), technical feasibility, and product-market fit. Designed to distinguish genuine innovation from buzzword-driven marketing in early-stage hype cycles.',
    data: {
      context: {
        experts: ['Macro Strategist', 'Lead Tokenomics Analyst'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'Does this project have a defensible moat and viable product-market fit within the emerging [RWA/AI/DePIN] sector?',
        hypothesis: 'The project is a first-mover in a high-TAM vertical but faces significant regulatory or technical hurdles to scale.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'Sentiment Analysis', 'Predictive Modeling'],
        sectorFocus: ['RWA', 'AI', 'Infrastructure'],
        demographicFocus: ['Institutional', 'Retail'],
      },
      output: {
        structure: [
          'executive_summary',
          'competitive_landscape',
          'investment_thesis',
          'price_prediction',
          'risk_assessment',
        ],
        format: 'slide_deck',
        tone: 'opinionated',
        visuals: ['charts', 'tables'],
      },
      risk_assessment: {
        key_risks: ['regulatory_risk', 'competitor_risk', 'market_risk'],
        black_swans: 'Major regulatory crackdown on the specific asset class (e.g., securities classification for RWAs).',
      },
      asset_sourcing: {
        social_sources: 'Messari, The Block, X/Twitter',
      }
    },
  },
  {
    id: 'hodl-strategy',
    name: 'Long-Term HODL Strategy',
    description: 'Multi-cycle conviction framework for the 3-5 year horizon. Synthesizes macro correlation, on-chain retention metrics, and competitive moats to validate "Blue Chip" status. Perfect for constructing a passive, high-conviction portfolio aiming for cycle-agnostic growth.',
    data: {
      context: {
        experts: ['Macro Strategist', 'Lead Tokenomics Analyst', 'On-Chain/Data Engineer'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Strategic',
      },
      coreQuestion: {
        primaryQuestion: 'Is this asset a viable long-term hold (3-5 years)? What are the risk-adjusted return expectations?',
        hypothesis: 'The project has strong fundamentals but is currently undervalued due to market sentiment.',
      },
      specifications: {
        methodology: ['Fundamental Analysis', 'Predictive Modeling', 'Sentiment Analysis', 'On-chain Quant Analysis'],
        timePeriod: 'Current cycle + 5 year horizon',
        marketTrends: 'Synthesize long-term market cycles. INCLUDE A TABLE of consensus-based price predictions for 2025-2030 from reputable sources (e.g., VanEck, Standard Chartered, Ark Invest).',
      },
      output: {
        structure: [
          'executive_summary',
          'tokenomics_deep_dive',
          'investment_thesis',
          'risk_assessment',
          'price_prediction',
        ],
        format: 'markdown',
        tone: 'opinionated',
        length: 'Comprehensive (~2000 words)',
        visuals: ['charts', 'tables'],
      },
      risk_assessment: {
        key_risks: ['market_risk', 'regulatory_risk', 'tech_risk'],
        stress_scenarios: 'Regulatory classification as a security. Prolonged bear market.',
      },
      asset_sourcing: {
        social_sources: 'Coindesk, The Block, Official Governance Forums, X/Twitter',
        price_sources: 'CoinGecko, Binance',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
        include_provenance_table: true,
      }
    },
  },
  {
    id: 'live-news-scanner',
    name: 'Live News & Catalysts Scanner',
    description: 'Real-time sentiment and news impact analysis. Scans the last 72 hours of regulatory updates, hacks, and viral social threads to explain sudden volatility or identify immediate risks. Best used for daily market maintenance and reacting to breaking events.',
    data: {
      context: {
        experts: ['Macro Strategist', 'Lead Tokenomics Analyst'],
        purpose: 'Inform trading/investment decision',
        actionability: 'Practical trading plan',
      },
      coreQuestion: {
        primaryQuestion: 'What are the most significant news stories, regulatory updates, and social catalysts from the last 24-72 hours?',
        hypothesis: 'Recent news events are driving immediate price action that is not yet fully priced in.',
      },
      specifications: {
        methodology: ['Event-Driven Analysis', 'Sentiment Analysis', 'Fundamental Analysis'],
        timePeriod: 'Last 7 days + Next 30 days',
        marketTrends: 'Focus on headlines from major crypto outlets (CoinDesk, Cointelegraph) and viral X/Twitter threads.',
      },
      output: {
        structure: [
          'executive_summary',
          'news_analysis',
          'risk_assessment',
          'investment_thesis',
        ],
        format: 'markdown',
        tone: 'neutral',
        length: 'Concise (~1000 words)',
        visuals: ['tables'],
      },
      risk_assessment: {
        key_risks: ['market_risk', 'regulatory_risk'],
        stress_scenarios: 'FUD campaigns on social media. Misinterpreted regulatory news.',
      },
      asset_sourcing: {
        social_sources: 'X/Twitter, CryptoCalendar, CoinDesk, The Block',
      },
      quality_guardrails: {
        guardrail_preset: 'loose',
        include_provenance_table: true,
      }
    },
  }
];
