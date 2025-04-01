package org.fmm.oauth.springsocial.handler;

import java.security.KeyStoreException;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.text.ParseException;
import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jwt.SignedJWT;

import jakarta.annotation.PostConstruct;

@Service
public class TokenProvider {
	private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
	
	private AppProperties appProperties;
	
	private Map<String, RSAPublicKey> publicKeyMap = null;
	private Map<String, JWSVerifier> jwsVerifierMap = null;
	
	@Autowired
	private ApplicationContext applicationContext;
	
	public TokenProvider(AppProperties appProperties) {
		this.appProperties = appProperties;
	}

	@PostConstruct
	public void init() throws KeyStoreException {
	}
	
	public String createToken(Authentication authentication) {
		return extractToken(authentication);
	}
	
	public String extractToken(Authentication authentication) {
		OidcUser userPrincipal = (OidcUser) authentication.getPrincipal();
		
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
		return userPrincipal.getIdToken().getTokenValue();
	}
	
	public Long getUserIdFromToken(String token) {
		return 1l;
	}
	
	public String getUserNameFromToken(String authToken) throws ParseException {
		SignedJWT jwt = null;
		jwt = parseToken(authToken);
		return jwt.getJWTClaimsSet().getSubject();
	}

	public String getEmailFromToken(String authToken) throws ParseException {
		SignedJWT jwt = null;
		jwt = parseToken(authToken);
		return (String)jwt.getJWTClaimsSet().getClaim("email");
	}

	// Ahora está fallando por los cambios realizados en el user
	public boolean validateToken(String authToken) {
		boolean verifiedSignature = false;
		try {
//			Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
			PublicKey publicKey = null;
			appProperties.getAuth().getTokenSecret();

			SignedJWT jwt = null;
			JWSHeader headers = null;
			String kid = null;
			JWSVerifier rsaVerifier = null;
			String alias = null; 
			
			jwt = parseToken(authToken);
			headers=jwt.getHeader();
			kid=headers.getKeyID();
//			alias=appProperties.getProviderPropertiesByKid().get(kid).getAlias();
//			System.out.println(alias + "->" +publicKey);
//			logger.debug("kid:{} -> alias:{} -> publicKey:{}",kid,alias,publicKey);
			
			if (!jwsVerifierMap.containsKey(kid)) {
				logger.error("No public key for validate signature. Alias: {}", kid);
				return false;
			}

			rsaVerifier = jwsVerifierMap.get(kid);
			verifiedSignature = jwt.verify(rsaVerifier);
			return verifiedSignature;
			
		} catch (IllegalArgumentException ex) {
			logger.error("JWT claims string is empty");
		} catch (ParseException e) {
			logger.error("Invalid JWT. ParseException");
		} catch (JOSEException e) {
			logger.error("Invalid JWT -signature not validated-. JOSEException");
		} 
		
		return false;
	}
	
	private SignedJWT parseToken(String authToken) throws ParseException {
		SignedJWT jwt = null;
		jwt = SignedJWT.parse(authToken);
		return jwt;
	}
	
}
