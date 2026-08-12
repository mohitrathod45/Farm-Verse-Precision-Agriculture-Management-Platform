package com.farmverse.farmverse_backend.exception;

public class FarmHasAssociatedRecordsException extends RuntimeException {

    public FarmHasAssociatedRecordsException(String message) {
        super(message);
    }

}
