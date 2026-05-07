package com.esgic.schoolmanagementbackend.exceptions.handlers;

import com.esgic.schoolmanagementbackend.exceptions.UtilisateurNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class RestExceptionHandler {


    @ExceptionHandler(UtilisateurNotFoundException.class)
    public ResponseEntity<?> handleUtilisateurNotFoundException(UtilisateurNotFoundException e) {
        return ResponseEntity.status(NOT_FOUND)
                .body(e.getMessage());
    }

}
