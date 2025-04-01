package org.fmm.oauth.springsocial.controller;

import java.util.HashMap;
import java.util.Map;

import org.fmm.oauth.springsocial.security.oidc.user.OAuth2UserInfo;
import org.fmm.oauth.springsocial.security.oidc.user.OAuth2UserInfoFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class SocialApplicationController {
/**
 * Parecía que así simplemente iba a devolver la cookie XSRF-TOKEN, pero no.
 * Vamos a forzarla en otro método
 * @return
 */
	@GetMapping("/csrf-token")
	public ResponseEntity<String> getCsrfToken() {
		return ResponseEntity.ok("CSRF TOken set");
	}
	
	@GetMapping("/csrf-token2")
	public CsrfToken getCsrfToken2(HttpServletRequest request) {
		return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
	}
	
	
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
    	if (principal != null) {
	    	Map<String, Object> elMapa = principal.getAttributes();
	    	
//	    	elMapa.forEach(System.out::println;)
//	    	for (String keys: elMapa.keySet()) {
//	    		
//	    	}
	    	return elMapa;
    	} else 
    		return new HashMap<String, Object>();
//        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    @PostMapping("/profile")
    public OAuth2UserInfo profile(@AuthenticationPrincipal OAuth2User principal) {
    	OAuth2UserInfo user = null;
    	
        SecurityContext context = SecurityContextHolder.getContext();

        Authentication auth = context.getAuthentication();
        if (auth instanceof OAuth2AuthenticationToken oAuth2Token) {
    	  	user = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2Token.getAuthorizedClientRegistrationId(), principal.getAttributes());
        }
    	return user;
    }
/*
    @GetMapping("/")
    public ModelAndView autenticado(@RequestParam("token") String token, ModelMap model, ModelAndView mav, HttpEntity<?>entity, HttpServletRequest request, @AuthenticationPrincipal OAuth2User principal) {
    	String jSessionValue = entity.getHeaders().get("cookie").getFirst();
    	jSessionValue = request.getCookies()[0].getValue();
    	String jSessionName = request.getCookies()[0].getName();
    	model.addAttribute(jSessionName,jSessionValue);
    	
    	model.addAttribute("Principal", principal.getName());
    	mav.getViewName();
    	return new ModelAndView("redirect:http://localhost:4200/home", model);
    }
*/    
//    @GetMapping("/")
    public Map<String, Object> autenticado2(@RequestParam("token") String token, ModelMap model, ModelAndView mav, HttpEntity<?>entity, HttpServletRequest request, @AuthenticationPrincipal OAuth2User principal) {
    	final Map<String, Object> elMapa;
    	String jSessionValue = null;
    	String jSessionName = null;
    	
    	jSessionName = request.getCookies()[0].getName();
    	jSessionValue = request.getCookies()[0].getValue();
		//entity.getHeaders().get("cookie").getFirst();

    	
    	elMapa = new HashMap<String, Object>();
    	
    	principal.getAttributes().forEach((k,v) -> {
    		elMapa.put(k, v);
    	});

    	elMapa.put(jSessionName, jSessionValue);
    	return elMapa;
    }
}