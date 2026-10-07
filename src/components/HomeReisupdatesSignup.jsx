import { useCallback, useState } from 'react';
import ToastNotification from './ToastNotification';
import { REISUPDATES_TOASTS } from '../lib/reisupdatesMessages';
import { subscribeReisupdates } from '../lib/reisupdatesApi';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HomeReisupdatesSignup = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const closeToast = useCallback(() => setToast(null), []);

  const showToast = (scenario) => {
    const entry = REISUPDATES_TOASTS[scenario];
    if (!entry) return;
    setToast({ variant: entry.variant, message: entry.message });
  };

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Vul een e-mailadres in.';
    if (!EMAIL_PATTERN.test(trimmed)) return 'Vul een geldig e-mailadres in.';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;

    setIsSubmitting(true);
    try {
      const outcome = await subscribeReisupdates(email);
      const toastKey =
        outcome === 'success' ||
        outcome === 'already' ||
        outcome === 'blacklist'
          ? outcome
          : 'error';
      showToast(toastKey);
      if (outcome === 'success') {
        setEmail('');
      }
    } catch {
      showToast('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailInvalid = Boolean(emailError);

  return (
    <section
      id="reisupdates"
      className="scroll-mt-8 mt-10 md:mt-14 mb-10 mx-6 lg:mx-32"
      aria-labelledby="reisupdates-heading"
    >
      <div className="mx-auto max-w-3xl rounded-lg border-4 border-[#162b58] bg-white px-6 py-10 shadow-md text-center">
        <h2
          id="reisupdates-heading"
          className="text-3xl lg:text-5xl text-[#162b58] font-bold"
        >
          Als eerste op de hoogte van nieuwe reizen?
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#162b58] leading-relaxed max-w-2xl mx-auto">
          Laat uw e-mailadres achter en ontvang onze nieuwe reizen in uw mailbox.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 mx-auto max-w-xl flex flex-col sm:flex-row sm:items-start gap-4 text-left"
        >
          <div className="flex-1 min-w-0">
            <label
              htmlFor="reisupdates-email"
              className="block text-sm font-semibold text-[#162b58] mb-1"
            >
              E-mailadres
            </label>
            <input
              id="reisupdates-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              aria-invalid={emailInvalid}
              aria-describedby={
                emailInvalid ? 'reisupdates-email-error' : 'reisupdates-email-hint'
              }
              placeholder="uwemail@voorbeeld.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border-2 border-[#162b58] bg-white px-3 py-3 text-[#162b58] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ab0e1] disabled:opacity-60"
            />
            {emailInvalid ? (
              <p
                id="reisupdates-email-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {emailError}
              </p>
            ) : (
              <p id="reisupdates-email-hint" className="mt-1 text-xs text-gray-600">
                Uw e-mailadres gebruiken we enkel om u op de hoogte te houden van nieuwe reizen.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="w-full sm:w-auto shrink-0 sm:mt-[1.625rem] bg-[#162b58] hover:bg-[#4ab0e1] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors duration-200"
          >
            {isSubmitting ? 'Even geduld…' : 'Schrijf u in'}
          </button>
        </form>
        <p className="mt-6 text-xs text-gray-600 leading-relaxed max-w-xl mx-auto">
          U kunt zich op elk moment uitschrijven via de link onderaan onze mails.
        </p>
      </div>

      <ToastNotification
        message={toast?.message}
        variant={toast?.variant}
        onClose={closeToast}
      />
    </section>
  );
};

export default HomeReisupdatesSignup;
