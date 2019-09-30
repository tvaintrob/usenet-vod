import os
import hashlib
import binascii
from flask_sqlalchemy import SQLAlchemy

DB = SQLAlchemy()


class User(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(30), unique=True, nullable=False)
    password_hash = DB.Column(DB.String(), nullable=False)
    settings = DB.relationship("UserSetting")

    def set_password(self, passwd: str):
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode("ascii")
        pwdhash = hashlib.pbkdf2_hmac("sha512", passwd.encode("utf-8"), salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        self.password_hash = (salt + pwdhash).decode("ascii")

    def verify_password(self, cand: str):
        salt = self.password_hash[:64]
        stored_password = self.password_hash[64:]
        pwdhash = hashlib.pbkdf2_hmac(
            "sha512", cand.encode("utf-8"), salt.encode("ascii"), 100000
        )
        pwdhash = binascii.hexlify(pwdhash).decode("ascii")
        return pwdhash == stored_password


class Setting(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(), unique=True)


class UserSetting(DB.Model):
    user_id = DB.Column(DB.Integer, DB.ForeignKey("user.id"), primary_key=True)
    setting_id = DB.Column(DB.Integer, DB.ForeignKey("setting.id"), primary_key=True)
    value = DB.Column(DB.String())
    setting = DB.relationship("Setting")
