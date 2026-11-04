import React from 'react';
import ReactDOM from 'react-dom/client';
import confetti from 'canvas-confetti';
import { Chart } from 'chart.js/auto';
import * as lucide from 'lucide';
import '../data.js';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import * as policyService from './services/policyService';
import { supportedLanguages, translate } from './i18n';

window.React = React;
window.ReactDOM = ReactDOM;
window.confetti = confetti;
window.Chart = Chart;
window.lucide = lucide;
window.safeScrollSupabase = { isConfigured: isSupabaseConfigured, client: supabase };
window.safeScrollPolicyService = policyService;
window.safeScrollI18n = { supportedLanguages, translate };

import('../app.jsx');
