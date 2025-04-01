package org.fmm.oauth.springsocial.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6466966374362243327L;
	private String resourceName;
	private String fieldName;
	private Object fieldVale;
	
	public ResourceNotFoundException(String resourceName, String fieldName, Object fieldVale) {
		super();
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldVale = fieldVale;
	}

	public String getResourceName() {
		return resourceName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public Object getFieldVale() {
		return fieldVale;
	}
	
}
