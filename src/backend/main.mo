import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import List "mo:core/List";

actor {
  type SubmissionId = Nat;
  type Admin = Principal;

  var admin : ?Admin = null;
  let submissions = List.empty<Submission>();
  var submissionCounter = 0;

  type Submission = {
    id : SubmissionId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Nat.compare(submission1.id, submission2.id);
    };
  };

  public type SubmissionInput = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  public type SubmissionView = {
    id : SubmissionId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  func toSubmissionView(submission : Submission) : SubmissionView {
    {
      id = submission.id;
      name = submission.name;
      email = submission.email;
      subject = submission.subject;
      message = submission.message;
      timestamp = submission.timestamp;
    };
  };

  public shared ({ caller }) func initializeAdmin() : async () {
    switch (admin) {
      case (null) { admin := ?caller };
      case (_) { Runtime.trap("Admin already initialized") };
    };
  };

  func assertAdmin(caller : Principal) {
    switch (admin) {
      case (null) { Runtime.trap("Admin not initialized") };
      case (?adminId) {
        if (caller != adminId) {
          Runtime.trap("Only admin can perform this action");
        };
      };
    };
  };

  public shared ({ caller }) func submit(input : SubmissionInput) : async () {
    let submission : Submission = {
      id = submissionCounter;
      name = input.name;
      email = input.email;
      subject = input.subject;
      message = input.message;
      timestamp = Time.now();
    };

    submissions.add(submission);
    submissionCounter += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [SubmissionView] {
    assertAdmin(caller);
    submissions.toArray().map(toSubmissionView).sort();
  };
};
