package org.fmm.oauth.springsocial.config;

import java.util.Arrays;
import java.util.List;

import org.fmm.oauth.springsocial.handler.FMMRedirectStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.entrypoint.FMMEntryPoint;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SocialApplicationConfig {
	
	@Autowired
	public OAuth2AuthenticationSuccessHandler successHandler;
	
	
//	@Bean
//	public OAuth2AuthenticationSuccessHandler getHandler() {
//		return this.successHandler;
//	}
	
//	@Bean
//	public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
//	    return new HttpCookieOAuth2AuthorizationRequestRepository();
//	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		//RequestMatcher aux =new AntPathRequestMatcher()
		http
//			.oauth2Login(Customizer.withDefaults())
/* FMMP -> desactivo momentáneamente
*/
			.oauth2Login(oauth2 -> oauth2
					.authorizationEndpoint(a -> a
						.authorizationRedirectStrategy(new FMMRedirectStrategy()))

					.successHandler(successHandler)
				
//					.redirectionEndpoint(redirection -> redirection...)
//					.authorizedClientRepository()
					)
/*			
FMMP */			
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(AntPathRequestMatcher.antMatcher("/")).permitAll()
				.requestMatchers(AntPathRequestMatcher.antMatcher("/error")).permitAll()
				.requestMatchers(AntPathRequestMatcher.antMatcher("/webjars/**")).permitAll()
				.requestMatchers(AntPathRequestMatcher.antMatcher("/oauth2/**")).permitAll()
				.requestMatchers(AntPathRequestMatcher.antMatcher("/logout")).permitAll()
				.requestMatchers(HttpMethod.OPTIONS, "/profile").permitAll()
				.requestMatchers("/profile").authenticated()
				.anyRequest().authenticated()
//				.anyRequest().authenticated()
			)
			.exceptionHandling(e -> 
				e.authenticationEntryPoint(new FMMEntryPoint(HttpStatus.UNAUTHORIZED))
			)
			.logout(l -> l
				.logoutSuccessUrl("/")
				.logoutUrl("/logout")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
				.logoutSuccessHandler((request, response, authentication)-> {
					response.setStatus(HttpServletResponse.SC_NO_CONTENT); // 204 No Content
				})
				.permitAll())
			
			.csrf(c -> c
				.csrfTokenRepository(new HttpSessionCsrfTokenRepository())
//				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
				.ignoringRequestMatchers("/logout","/")
			)
//			.csrf().disable()
			
//			.cors(cors -> cors // No funciona
//					.disable())
		;
		return http.build();
	}

/**
 * 
 * @return
 */
/* setAllowedHeaders
 * Define los encabezados que el servidor acepta en las solicitudes CORS
 * (para poder procesar bien la solicitud OPTIONS y la POST)
 */

/* setAllowCredentials
 * El navegador permite enviar la cookie en llamadas cross-origin.
 *  
 * Es esencial para que las cookies de sesión se envíen en solicitudes CORS, 
 * porque por defecto en llamadas CORS, el navegador bloquea el envío de cookies en solicitudes CORS,
 *  a menos que el servidor indique explícitamente que lo permite.
 *  Además incluye la cabecera:
 *  Access-Control-Allow-Credentials: true
 *  en la respuesta
 *  
 *  Además, requiere que setAllowedOrigins() contenga orígenes específicos (no puede ser *, en
 *  este caso es http://localhost:4200","http://localhost:8080
 */

/* setExposedHeaders
 * Especifica qué cabeceras del servidor se deben hacer accesibles al código JS del 
 * navegador, cuando este hace una solicitud CORS.
 */

	@Bean
	public UrlBasedCorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200","http://localhost:8080")); // Orígenes permitidos
		configuration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS")); // Métodos permitidos ¿por qué está OPTIONS?
		configuration.setAllowedHeaders(List.of("*")); 
		configuration.setAllowCredentials(true);
	    configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
/*
//	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/","/error","/webjars/**", "/oauth2/**").permitAll()
				.anyRequest().authenticated()
			)
			.exceptionHandling(e -> e
				// 403 - Forbidden
//				.authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
				// 401 - Unauthorized
				.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
			.logout(l -> l
				.logoutSuccessUrl("/").permitAll())
			.oauth2Login(Customizer.withDefaults());
		return http.build();
	}

 */
}
