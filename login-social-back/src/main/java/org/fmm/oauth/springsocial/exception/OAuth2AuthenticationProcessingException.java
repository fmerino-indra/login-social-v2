package org.fmm.oauth.springsocial.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2904589639307435695L;

	public OAuth2AuthenticationProcessingException(String msg) {
		super(msg);
	}

	public OAuth2AuthenticationProcessingException(String msg, Throwable t) {
		super(msg, t);
	}

}
