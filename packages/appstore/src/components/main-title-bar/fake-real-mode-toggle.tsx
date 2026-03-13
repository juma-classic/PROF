import React from 'react';
import { Button } from '@deriv/components';
import { useStore, observer } from '@deriv/stores';
import { localize } from '@deriv/translations';
import './fake-real-mode-toggle.scss';

const FakeRealModeToggle = observer(() => {
    const { traders_hub, client } = useStore();
    const { loginid } = client;
    const { selected_account_type, selectAccountType } = traders_hub;

    // Whitelist of accounts allowed to access fake real mode
    const fake_real_mode_whitelist = ['VRTC10967644', 'CR736515'];
    const is_whitelisted = fake_real_mode_whitelist.includes(loginid);
    const is_vrtc_account = /^VRTC/.test(loginid);

    // Only show button for whitelisted VRTC accounts
    if (!is_whitelisted || !is_vrtc_account) {
        return null;
    }

    const is_fake_real_mode = selected_account_type === 'real';

    const handleToggle = async () => {
        const new_account_type = is_fake_real_mode ? 'demo' : 'real';
        await selectAccountType(new_account_type);
    };

    return (
        <div className='fake-real-mode-toggle'>
            <Button
                className={`fake-real-mode-toggle__button ${is_fake_real_mode ? 'fake-real-mode-toggle__button--active' : ''}`}
                onClick={handleToggle}
                secondary
                small
            >
                {is_fake_real_mode ? localize('Exit Fake Real') : localize('Enter Fake Real')}
            </Button>
        </div>
    );
});

export default FakeRealModeToggle;
