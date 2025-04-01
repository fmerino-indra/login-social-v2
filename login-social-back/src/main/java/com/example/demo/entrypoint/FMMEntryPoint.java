package com.example.demo.entrypoint;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.util.Assert;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class FMMEntryPoint implements AuthenticationEntryPoint {

	private final HttpStatus httpStatus;

	/**
	 * Creates a new instance.
	 * @param httpStatus the HttpStatus to set
	 */
	public FMMEntryPoint(HttpStatus httpStatus) {
		Assert.notNull(httpStatus, "httpStatus cannot be null");
		this.httpStatus = httpStatus;
	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) {
		response.setStatus(this.httpStatus.value());
	}

}
