-- Optional seed content for policy library after migrations.
-- Replace source URLs with verified official references before production use.

insert into public.policies (country_code, title, status, summary, source_url, last_reviewed)
values
  (
    'EU_OTHER',
    'GDPR Article 8 — children''s consent',
    'in_force',
    'Sets digital consent age between 13 and 16 depending on member state rules.',
    'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    current_date
  ),
  (
    'EU_OTHER',
    'Digital Services Act — protection of minors',
    'in_force',
    'Requires high privacy, safety and security standards for minors on platforms.',
    'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package',
    current_date
  ),
  (
    'FR',
    'France digital majority / parental consent under 15',
    'in_force',
    'National law requiring parental consent pathways for under-15 social media access.',
    'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799447',
    current_date
  )
on conflict do nothing;
