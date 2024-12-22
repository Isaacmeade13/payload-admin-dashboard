'use client';

import Header from '../components/shared/header/Header';
import { StaticText } from '../components/shared/staticText/StaticText';
import { POLICY_TEXT } from './policyText';

function Policy() {
  return (
    <div>
      <Header withSearchBar={false} withOutImageLogo withTextLogoMobile />
      <StaticText title="EventCage Privacy Policy" text={POLICY_TEXT} />
    </div>
  );
}

export default Policy;
