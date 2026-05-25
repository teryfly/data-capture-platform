package com.zw.admin.server.advice;

import com.zw.admin.server.tips.SuccessTip;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * springmvc异常处理
 *
 */

@RestControllerAdvice
public class ExceptionHandlerAdvice {

	private static final Logger log = LoggerFactory.getLogger("adminLogger");

	@ExceptionHandler({ IllegalArgumentException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public SuccessTip badRequestException(IllegalArgumentException exception) {
		return new SuccessTip(HttpStatus.BAD_REQUEST.value() , exception.getMessage());
	}

	@ExceptionHandler({ UnknownAccountException.class, IncorrectCredentialsException.class })
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public SuccessTip loginException(Exception exception) {
		return new SuccessTip(HttpStatus.UNAUTHORIZED.value() , exception.getMessage());
	}

	@ExceptionHandler({ UnauthorizedException.class })
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public SuccessTip forbidden(Exception exception) {
		return new SuccessTip(HttpStatus.FORBIDDEN.value() , exception.getMessage());
	}

	@ExceptionHandler({ MissingServletRequestParameterException.class, HttpMessageNotReadableException.class,
			UnsatisfiedServletRequestParameterException.class, MethodArgumentTypeMismatchException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public SuccessTip badRequestException(Exception exception) {
		return new SuccessTip(HttpStatus.BAD_REQUEST.value() , exception.getMessage());
	}

	@ExceptionHandler(Throwable.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public SuccessTip exception(Throwable throwable) {
		log.error("系统异常", throwable);
		return new SuccessTip(HttpStatus.INTERNAL_SERVER_ERROR.value() , throwable.getMessage());

	}

}
