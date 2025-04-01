package org.fmm.oauth.springsocial.handler;

import java.io.IOException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;

import jakarta.annotation.PostConstruct;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
	private final Auth auth = new Auth();
	private final OAuth2 oauth2 = new OAuth2();
	private final JWTProperties jwtProperties = new JWTProperties();
	
	private Map<String,ProvidersConfigProperties> providerPropertiesByKid = null;
	private Map<String,Map<String, ProvidersConfigProperties>> providerMapProperties = null;

	public Map<String, Map<String, ProvidersConfigProperties>> getProviderMapProperties() {
		return providerMapProperties;
	}

	public void setProviderMapProperties(Map<String, Map<String, ProvidersConfigProperties>> providerMapProperties) {
		this.providerMapProperties = providerMapProperties;
	}

	@PostConstruct
	public void processProperties() {
		List<ProvidersConfigProperties> listaConfigProperties = null;
		if (jwtProperties != null && jwtProperties.providers != null) {
			providerMapProperties = new HashMap<>(jwtProperties.providers.size());
			
			for (String key:jwtProperties.providers.keySet()) {
				listaConfigProperties = jwtProperties.providers.get(key);
				providerPropertiesByKid = new HashMap<>(listaConfigProperties.size());
				for (ProvidersConfigProperties configProperty : listaConfigProperties) {
					if (configProperty.getjWKConfigProperties() != null) {
						
					} else if (configProperty.getjKSConfigProperties() != null) {
						providerPropertiesByKid.put(configProperty.getjKSConfigProperties().getKid(), configProperty);
					} else if (configProperty.getPubCertConfigProperties() != null) {
						providerPropertiesByKid.put(configProperty.getPubCertConfigProperties().getKid(), configProperty);
					}
//					providerPropertiesByKid.put(configProperty.getKid(), configProperty);
				}
				providerMapProperties.put(key, providerPropertiesByKid);
			}
		}
		System.out.println("Fin de processProperties");
	}
	
	private void processJWK(JWKConfigProperties configProperties) {
		Resource jwkResource;
		JWKSet set = null;
		JWK jwk = null;
		RSAKey key = null;
		PublicKey pKey = null;
		RSAPublicKey rsaPkey = null;
		byte[] data = null;
		String base64econded = null;
		
		RSAPublicKeySpec spec;
		KeyFactory f = null;
		PublicKey pk = null; 
		
		jwkResource = new ClassPathResource(configProperties.getJwkFile());
		try {
			f = KeyFactory.getInstance("RSA");
			set = JWKSet.load(jwkResource.getFile());

		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	public static class Auth {
		private String tokenSecret;
		private long tokenExpirationMsec;
		
		public long getTokenExpirationMsec() {
			return tokenExpirationMsec;
		}

		public void setTokenExpirationMsec(long tokenExpirationMsec) {
			this.tokenExpirationMsec = tokenExpirationMsec;
		}

		public String getTokenSecret() {
			return tokenSecret;
		}
		
		public void setTokenSecret(String tokenSecret) {
			this.tokenSecret = tokenSecret;
		}
	}
	
	public static final class OAuth2 {
		private List<String> authorizedRedirectUris = new ArrayList<>();

		public List<String> getAuthorizedRedirectUris() {
			return authorizedRedirectUris;
		}
		
		public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
			this.authorizedRedirectUris = authorizedRedirectUris;
			return this;
		}
	}

	public static class JWTProperties {
//		private String file;
//		private String password;
//		private String alias;
		
		private Map<String, List<ProvidersConfigProperties>> providers;
		
		public Map<String, List<ProvidersConfigProperties>> getProviders() {
			return providers;
		}

		public void setProviders(Map<String, List<ProvidersConfigProperties>> aliasProveedores) {
			this.providers = aliasProveedores;
		}
	}
	/**
	 * jwtProperties:
	 *   wso2is:
     *   - kid: ZDI3MjExOTNjMzViYjgzZDE4Y2Y1OGU3OTczYzkzNTkxYTRlYzUxM2FmZmM4NzdlM2RkYmExOWFmNzZhMWY0OQ_RS256
     *     alias: wso2is
     *     keystore: wso2is.jks
     *     password: femema
     *   google:
     *   - kid: 822838c1c8bf9edcf1f5050662e54bcb1adb5b5f
     *     file: google-822838c1c8bf9edcf1f5050662e54bcb1adb5b5f.pub
     *      
	 * @author felix
	 *
	 */
	public static class JWTP {
		private String kid;
		private String alias;
		private String keystore;
		private String file;
		private String password;
		
		public String getAlias() {
			return alias;
		}

		public void setAlias(String alias) {
			this.alias = alias;
		}

		public String getFile() {
			return file;
		}

		public void setFile(String file) {
			this.file = file;
		}

		public String getKid() {
			return kid;
		}

		public void setKid(String kid) {
			this.kid = kid;
		}

		public String getKeystore() {
			return keystore;
		}

		public void setKeystore(String keystore) {
			this.keystore = keystore;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}
	
	public Auth getAuth() {
		return auth;
	}

	public OAuth2 getOauth2() {
		return oauth2;
	}

	public JWTProperties getJwtProperties() {
		return jwtProperties;
	}

	public Map<String, ProvidersConfigProperties> getProviderPropertiesByKid() {
		return providerPropertiesByKid;
	}

	public static class ProvidersConfigProperties {
		private PubCertConfigProperties pubCertConfigProperties;
		private JWKConfigProperties jWKConfigProperties;
		private JKSConfigProperties jKSConfigProperties;
		
		public PubCertConfigProperties getPubCertConfigProperties() {
			return pubCertConfigProperties;
		}
		public void setPubCertConfigProperties(PubCertConfigProperties pubCertConfigProperties) {
			this.pubCertConfigProperties = pubCertConfigProperties;
		}
		public JWKConfigProperties getjWKConfigProperties() {
			return jWKConfigProperties;
		}
		public void setjWKConfigProperties(JWKConfigProperties jWKConfigProperties) {
			this.jWKConfigProperties = jWKConfigProperties;
		}
		public JKSConfigProperties getjKSConfigProperties() {
			return jKSConfigProperties;
		}
		public void setjKSConfigProperties(JKSConfigProperties jKSConfigProperties) {
			this.jKSConfigProperties = jKSConfigProperties;
		}
	}
	
	public static class PubCertConfigProperties {
		private String kid;
		private String pubCertFile;
		
		public String getKid() {
			return kid;
		}

		public void setKid(String kid) {
			this.kid = kid;
		}

		public String getPubCertFile() {
			return pubCertFile;
		}

		public void setPubCertFile(String pubCertFile) {
			this.pubCertFile = pubCertFile;
		}
	}
	
	public static class JWKConfigProperties {

		private String jwkFile;

		public String getJwkFile() {
			return jwkFile;
		}

		public void setJwkFile(String jwkFile) {
			this.jwkFile = jwkFile;
		}
		
	}
	public static class JKSConfigProperties {
		private String kid;
		private String keystore;
		private String password;
		private String alias;
		
		public String getKid() {
			return kid;
		}

		public void setKid(String kid) {
			this.kid = kid;
		}

		public String getKeystore() {
			return keystore;
		}

		public void setKeystore(String keystore) {
			this.keystore = keystore;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getAlias() {
			return alias;
		}

		public void setAlias(String alias) {
			this.alias = alias;
		}
	}
}
