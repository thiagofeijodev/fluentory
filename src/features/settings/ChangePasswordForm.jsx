import { useState } from 'react';
import {
  Button,
  makeStyles,
  Dialog,
  DialogSurface,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
} from '@fluentui/react-components';
import { Password20Regular } from '@fluentui/react-icons';
import { Input } from '../../components/Input';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { updatePassword, getAuth } from '../../db';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
});

export const ChangePasswordForm = () => {
  const styles = useStyles();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const handleChangePassword = async () => {
    setError('');

    // Validation
    if (!currentPassword) {
      setError(t('Current password is required'));
      return;
    }

    if (!newPassword) {
      setError(t('New password is required'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('Password must be at least 6 characters'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('Passwords do not match'));
      return;
    }

    if (newPassword === currentPassword) {
      setError(t('New password must be different from current password'));
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser || !currentUser.email) {
        setError(t('Unable to update password'));
        return;
      }

      // Re-authenticate user before changing password
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      try {
        await signInWithEmailAndPassword(auth, currentUser.email, currentPassword);
      } catch {
        setError(t('Current password is incorrect'));
        setLoading(false);
        return;
      }

      // Update password
      await updatePassword(currentUser, newPassword);
      setOpen(false);
      handleReset();
      alert(t('Password changed successfully'));
    } catch (err) {
      setError(err.message || t('Failed to change password'));
    } finally {
      setLoading(false);
    }
  };

  // Only show for email/password users
  if (!user?.email) {
    return null;
  }

  return (
    <>
      <Button appearance="secondary" icon={<Password20Regular />} onClick={() => setOpen(true)}>
        {t('Change Password')}
      </Button>
      <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{t('Change Password')}</DialogTitle>
            <DialogContent>
              <div className={styles.container}>
                {error && (
                  <div style={{ color: 'var(--colorPaletteRedForeground1)', fontSize: '12px' }}>
                    {error}
                  </div>
                )}
                <div className={styles.inputGroup}>
                  <Input
                    type="password"
                    label={t('Current Password')}
                    placeholder={t('Enter your current password')}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Input
                    type="password"
                    label={t('New Password')}
                    placeholder={t('Enter your new password')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Input
                    type="password"
                    label={t('Confirm Password')}
                    placeholder={t('Confirm your new password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={handleClose} disabled={loading}>
                {t('Cancel')}
              </Button>
              <Button appearance="primary" onClick={handleChangePassword} disabled={loading}>
                {loading ? t('Changing...') : t('Change Password')}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default ChangePasswordForm;
