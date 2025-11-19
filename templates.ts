
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
    id: 'new-listing-dd',
    name: 'New Listing Due Diligence',
    description: 'Rapid assessment framework for evaluating new token launches, IDOs, or recent listings (0-6 months).',
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
    description: 'A deep dive into the technical and systemic risks of a protocol. Ideal for large deployments or DAO treasury diversification.',
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
      },
      risk_assessment: {
        key_risks: ['tech_risk', 'centralization_risk', 'market_risk'],
        stress_scenarios: 'Oracle failure leads to bad debt. Multi-sig signers collude. Infinite mint bug.',
      },
      quality_guardrails: {
        guardrail_preset: 'strict',
      },
    },
  },
  {
    id: 'narrative-swing',
    name: 'Narrative & Catalyst Swing Trade',
    description: 'Focuses on short-to-medium term price action driven by upcoming events, upgrades, or narrative rotation.',
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
        visuals: ['charts'],
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
    description: 'A granular examination of liquidity dynamics, yield sustainability, and mechanism design for decentralized finance protocols.',
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
        visuals: ['charts', 'diagrams'],
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
    description: 'Framework for evaluating projects at the intersection of crypto and emerging tech (RWA, AI, DePIN), focusing on TAM and product-market fit.',
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
  }
];
