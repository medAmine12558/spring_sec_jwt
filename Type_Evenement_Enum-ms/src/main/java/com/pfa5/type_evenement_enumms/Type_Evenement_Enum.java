package com.pfa5.type_evenement_enumms;

public enum Type_Evenement_Enum {
    Event1("Les rencontres d'anciens élèves"),
    Event2("Les visites guidées de la ville"),
    Event3("Les évènements de service communautaire"),
    Event4("les forums"),
    Event5("les Exams"),
    Event6("ok");

    public final String Event;
    Type_Evenement_Enum(String Event) {
        this.Event = Event;
    }
    public String getEvent() {
        return Event;
    }
}
