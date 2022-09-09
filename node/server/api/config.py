import os


basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Default Flask configuration inherited by all environments. Use this for
    development environments.
    """
    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    """Development Configurations"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DEV_DATABASE_URL"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    """
    Testing config applies for both local testing and travis configurations
    """
    TESTING = True
    WTF_CSRF_ENABLED = False
    TEST_DATABASE = os.environ.get(
        "TEST_DATABASE_URL"
    )
    if os.getenv("FLASK_CONFIG") == "travis":
        pass
    else:
        from sqlalchemy_utils.functions import database_exists, create_database
        if not database_exists(TEST_DATABASE):
            create_database(TEST_DATABASE)
        SQLALCHEMY_DATABASE_URI = TEST_DATABASE
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    """Production Configurations"""
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    )

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)


class DockerConfig(Config):
    """Docker config"""

    @classmethod
    def init_app(cls, app):
        ProductionConfig.init_app(app)

        # log to stderr
        import logging
        from logging import StreamHandler

        file_handler = StreamHandler()
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "docker": DockerConfig,
    "default": DevelopmentConfig,
}
