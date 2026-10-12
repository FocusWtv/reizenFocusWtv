import { useCallback, useState } from 'react';
import ToastNotification from './ToastNotification';
import { REISUPDATES_TOASTS, SUGGESTIE_TOASTS } from '../lib/reisupdatesMessages';
import { subscribeReisupdates } from '../lib/reisupdatesApi';
import { submitSuggestion } from '../lib/suggestionsFormSubmit';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUGGESTIE_MIN_LENGTH = 10;

const inputClassName =
  'w-full rounded-lg border-2 border-[#162b58] bg-white px-3 py-3 text-[#162b58] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ab0e1] disabled:opacity-60';

const HomeReisupdatesSignup = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const [suggestionName, setSuggestionName] = useState('');
  const [suggestionEmail, setSuggestionEmail] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionErrors, setSuggestionErrors] = useState({
    name: '',
    email: '',
    text: '',
  });
  const [isSubmittingSuggestion, setIsSubmittingSuggestion] = useState(false);

  const closeToast = useCallback(() => setToast(null), []);

  const showToast = (scenario) => {
    const entry = REISUPDATES_TOASTS[scenario];
    if (!entry) return;
    setToast({ variant: entry.variant, message: entry.message });
  };

  const showSuggestionToast = (scenario) => {
    const entry = SUGGESTIE_TOASTS[scenario];
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

  const validateSuggestionName = (value) => {
    if (!value.trim()) return 'Vul je naam in.';
    return '';
  };

  const validateSuggestionEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Vul een e-mailadres in.';
    if (!EMAIL_PATTERN.test(trimmed)) return 'Vul een geldig e-mailadres in.';
    return '';
  };

  const validateSuggestionText = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Vul je suggestie in.';
    if (trimmed.length < SUGGESTIE_MIN_LENGTH) {
      return `Schrijf minstens ${SUGGESTIE_MIN_LENGTH} tekens.`;
    }
    return '';
  };

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingSuggestion) return;

    const honey = e.currentTarget.querySelector('input[name="_honey"]');
    if (honey && honey.value) return;

    const errors = {
      name: validateSuggestionName(suggestionName),
      email: validateSuggestionEmail(suggestionEmail),
      text: validateSuggestionText(suggestionText),
    };
    setSuggestionErrors(errors);
    if (errors.name || errors.email || errors.text) return;

    setIsSubmittingSuggestion(true);
    try {
      const ok = await submitSuggestion({
        naam: suggestionName.trim(),
        email: suggestionEmail.trim(),
        suggestie: suggestionText.trim(),
      });
      if (ok) {
        showSuggestionToast('success');
        setSuggestionName('');
        setSuggestionEmail('');
        setSuggestionText('');
        setSuggestionErrors({ name: '', email: '', text: '' });
      } else {
        showSuggestionToast('error');
      }
    } catch {
      showSuggestionToast('error');
    } finally {
      setIsSubmittingSuggestion(false);
    }
  };

  const emailInvalid = Boolean(emailError);
  const suggestionNameInvalid = Boolean(suggestionErrors.name);
  const suggestionEmailInvalid = Boolean(suggestionErrors.email);
  const suggestionTextInvalid = Boolean(suggestionErrors.text);

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

        <div className="mt-10 pt-10 border-t border-[#162b58]/20">
          <h2
            id="suggesties"
            className="text-3xl lg:text-5xl text-[#162b58] font-bold"
          >
            Suggesties, ideeën? Die kan je steeds kwijt via dit formulier
          </h2>

          <form
            onSubmit={handleSuggestionSubmit}
            noValidate
            className="mt-8 mx-auto max-w-xl flex flex-col gap-4 text-left"
          >
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="suggestie-honey">Laat dit veld leeg</label>
              <input
                id="suggestie-honey"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="suggestie-naam"
                className="block text-sm font-semibold text-[#162b58] mb-1"
              >
                Naam
              </label>
              <input
                id="suggestie-naam"
                type="text"
                name="Naam"
                autoComplete="name"
                required
                value={suggestionName}
                onChange={(e) => {
                  setSuggestionName(e.target.value);
                  if (suggestionErrors.name) {
                    setSuggestionErrors((prev) => ({
                      ...prev,
                      name: validateSuggestionName(e.target.value),
                    }));
                  }
                }}
                aria-invalid={suggestionNameInvalid}
                aria-describedby={
                  suggestionNameInvalid ? 'suggestie-naam-error' : undefined
                }
                placeholder="Je naam"
                disabled={isSubmittingSuggestion}
                className={inputClassName}
              />
              {suggestionNameInvalid && (
                <p
                  id="suggestie-naam-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {suggestionErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="suggestie-email"
                className="block text-sm font-semibold text-[#162b58] mb-1"
              >
                Mailadres
              </label>
              <input
                id="suggestie-email"
                type="email"
                name="Mailadres"
                autoComplete="email"
                required
                value={suggestionEmail}
                onChange={(e) => {
                  setSuggestionEmail(e.target.value);
                  if (suggestionErrors.email) {
                    setSuggestionErrors((prev) => ({
                      ...prev,
                      email: validateSuggestionEmail(e.target.value),
                    }));
                  }
                }}
                aria-invalid={suggestionEmailInvalid}
                aria-describedby={
                  suggestionEmailInvalid ? 'suggestie-email-error' : undefined
                }
                placeholder="je.email@voorbeeld.be"
                disabled={isSubmittingSuggestion}
                className={inputClassName}
              />
              {suggestionEmailInvalid && (
                <p
                  id="suggestie-email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {suggestionErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="suggestie-tekst"
                className="block text-sm font-semibold text-[#162b58] mb-1"
              >
                Suggestie
              </label>
              <textarea
                id="suggestie-tekst"
                name="Suggestie"
                required
                rows={5}
                minLength={SUGGESTIE_MIN_LENGTH}
                value={suggestionText}
                onChange={(e) => {
                  setSuggestionText(e.target.value);
                  if (suggestionErrors.text) {
                    setSuggestionErrors((prev) => ({
                      ...prev,
                      text: validateSuggestionText(e.target.value),
                    }));
                  }
                }}
                aria-invalid={suggestionTextInvalid}
                aria-describedby={
                  suggestionTextInvalid ? 'suggestie-tekst-error' : undefined
                }
                placeholder="Jouw idee of suggestie"
                disabled={isSubmittingSuggestion}
                className={`${inputClassName} resize-y min-h-[8rem]`}
              />
              {suggestionTextInvalid && (
                <p
                  id="suggestie-tekst-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {suggestionErrors.text}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingSuggestion}
              aria-disabled={isSubmittingSuggestion}
              className="w-full sm:w-auto self-start bg-[#162b58] hover:bg-[#4ab0e1] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors duration-200"
            >
              {isSubmittingSuggestion ? 'Even geduld…' : 'Verstuur suggestie'}
            </button>
          </form>
        </div>
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
