'use client';

import Header from '../components/shared/header/Header';
import { StaticText } from '../components/shared/staticText/StaticText';
import { POLICY_TEXT } from './agreementText';

function Agreement() {
  return (
    <div>
      <Header withSearchBar={false} withOutImageLogo withTextLogoMobile />
      <StaticText title="EventCage Services Agreement" text={POLICY_TEXT} />
    </div>
  );
}

export default Agreement;
