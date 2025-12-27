import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Button, Input } from '../Components/ui';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-glow">
                            <span className="text-white font-bold text-2xl">G</span>
                        </div>
                        <span className="text-2xl font-bold text-neutral-800">
                            Green<span className="text-primary-600">Cart</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-strong p-8">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiMail className="w-8 h-8 text-primary-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Forgot password?</h1>
                                <p className="text-neutral-500">
                                    No worries, we'll send you reset instructions.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    icon={<FiMail className="w-5 h-5" />}
                                    required
                                />

                                <Button type="submit" fullWidth size="lg">
                                    Send Reset Link
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCheck className="w-8 h-8 text-primary-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check your email</h1>
                            <p className="text-neutral-500 mb-6">
                                We've sent a password reset link to <strong className="text-neutral-800">{email}</strong>
                            </p>
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => setIsSubmitted(false)}
                            >
                                Didn't receive the email? Click to resend
                            </Button>
                        </div>
                    )}

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
